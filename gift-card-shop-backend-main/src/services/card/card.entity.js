import { decryptCardCode, encryptCardCode } from '../../utils/encryption';
import Card from './card.schema';
import Order from '../order/order.schema';

const createAllowed = new Set(['name', 'description', 'imageUrl', 'cardValue', 'price', 'cardCode', 'status']);
const updateAllowed = new Set(['name', 'description', 'image', 'cardValue', 'price', 'cardCode', 'status']);


/**
 * Creates a new card in the database with the specified properties in the request body.
 *
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Function} Express route handler.
 * @throws {Error} If the request body includes invalid fields or if there's a database operation error.
 */
export const createCard = ({ db, imageUp }) => async (req, res) => {
  try {
    const valid = Object.keys(req.body).every(k => createAllowed.has(k));
    if (!valid) return res.status(400).send({ message: 'Invalid request body' })

    let image = null;
    if (req.files?.image?.path) {
      image = await imageUp(req.files.image.path);
    }

    let cardCode = [];
    if (req.body.cardCode && req.body.cardCode.length > 0) {
      cardCode = await Promise.all(req.body.cardCode.map(code => encryptCardCode(code)));
    }

    const cardData = { ...req.body, image, cardCode };

    const card = await db.create({ table: Card, key: cardData });
    await db.save(card);

    const decryptedCardCode = await Promise.all(card.cardCode.map(code => decryptCardCode(code)));

    res.status(200).send({
      message: 'Card created successfully',
      card: { ...card.toObject(), cardCode: decryptedCardCode },
    });

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Something went wrong', error: e.message });
  }
};



/**
 * * Updates an existing card in the database with the specified properties in the request body.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Function} Express route handler.
 * @throws {Error} If the request body includes invalid fields or if there's a database operation error.
 */



export const updateCard = ({ db, imageUp }) => async (req, res) => {
  try {
    const id = req.params.id;
    const updates = Object.keys(req.body);

    if (req.files?.image?.path) {
      req.body.image = await imageUp(req.files.image.path);
      if (!updates.includes('image')) updates.push('image');
    }

    const isValid = updates.every(field => updateAllowed.has(field));
    if (!isValid) return res.status(400).send('Invalid updates');

    const card = await db.findOne({ table: Card, key: { id } });
    if (!card) return res.status(404).send('Card not found');

    updates.forEach(field => {
      if (field === 'cardCode' && req.body[field] && Array.isArray(req.body[field])) {
        card[field] = req.body[field].map(code => encryptCardCode(code));
      } else {
        card[field] = req.body[field];
      }
    });

    await db.save(card);

    const decryptedCard = {
      ...card.toObject(),
      cardCode: card.cardCode ? card.cardCode.map(code => decryptCardCode(code)) : null
    };

    res.status(200).send(decryptedCard);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};



/**
 * Fetches all cards from the database with optional pagination.
 * @param {Object} db - The database object for interacting with the database.
 * @param {Object} req - The request object, including query parameters for pagination.
 * @param {Object} res - The response object.
 * @returns {Object} The paginated list of cards.
 */
export const getAllCards = ({ db }) => async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || null;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const cards = await Card.paginate(filter, { page, limit, sort: { createdAt: -1 } });

    const decryptedCards = await Promise.all(cards.docs.map(async card => {
      const decryptedCodes = card.cardCode && card.cardCode.length > 0
        ? await Promise.all(card.cardCode.map(code => decryptCardCode(code)))
        : [];

      const orders = await Order.find({ cardId: card._id });
      const soldCards = orders.length > 0
        ? await Promise.all(orders.map(order => decryptCardCode(order.cardCode)))
        : [];

      return {
        ...card.toObject(),
        cardCode: decryptedCodes,
        soldCards
      };
    }));

    res.status(200).send({ ...cards, docs: decryptedCards });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};


/**
 * Fetches a single card by its ID from the database.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Function} Express route handler.
 * @throws {Error} If there's a database operation error or if the card is not found.
 */
export const getCardById = ({ db }) => async (req, res) => {
  try {
    const { id } = req.params;
    const card = await db.findOne({ table: Card, key: { id } });
    if (!card) return res.status(404).send({ message: 'Card not found' });

    const decryptedCodes = card.cardCode && card.cardCode.length > 0
      ? await Promise.all(card.cardCode.map(code => decryptCardCode(code)))
      : [];

    const orders = await Order.find({ cardId: card._id });
    const soldCards = orders.length > 0
      ? await Promise.all(orders.map(order => decryptCardCode(order.cardCode)))
      : [];

    const decryptedCard = {
      ...card.toObject(),
      cardCode: decryptedCodes,
      soldCards
    };

    res.status(200).send(decryptedCard);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

/**
 * Deletes a card by its ID from the database.
 *  @params @param {Object} req - The request object containing the card ID in the URL parameters.
 * @returns {Function} Express route handler.
 * @throws {Error} If the request body includes invalid fields or if there's a database operation error.
 */
export const deleteCard = ({ db }) => async (req, res) => {
  try {
    const id = req.params.id;
    const card = await db.findOne({ table: Card, key: { id } });
    if (!card) return res.status(404).send('Card not found');
    await db.remove({ table: Card, key: { id } });
    res.status(200).send({ message: 'Card deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};
