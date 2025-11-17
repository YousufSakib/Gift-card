import { auth } from "../middlewares";
import { createCard, deleteCard, getAllCards, getCardById, updateCard } from "./card.entity";

/**
 * Initializes the card-related routes.
 * Applies authentication middleware to protect the endpoints.
 */
export default function card() {

  /**
   * POST /card
   * @description This route is used to create a new card.
   * @response {Object} 200 - the newly created card.
   * @response {Object} 400 - Bad request if the provided data is invalid.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.post('/card', auth, createCard(this));

  /**
   * PATCH /card/:id
   * @description This route is used to update an existing card by its ID.
   * @response {Object} 200 - the updated card.
   * @response {Object} 400 - Invalid updates or bad request.
   * @response {Object} 404 - Card not found.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.patch('/card/:id', auth, updateCard(this));

  /**
   * GET /cards
   * @description This route fetches all cards from the database with optional pagination.
   * @response {Array} 200 - A list of all cards.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.get('/cards', getAllCards(this));

  /**
   * GET /card/:id
   * @description This route fetches a single card by its ID from the database.
   * @response {Object} 200 - The requested card.
   * @response {Object} 404 - Card not found if the card with the specified ID doesn't exist.
   * @response {Object} 500 - Internal server error if something goes wrong.
   */
  this.route.get('/card/:id', getCardById(this));

  /**
  * DELETE /card/:id
  * @description This route is used to delete an existing card by its ID.
  * @response {Object} 200 - success message.
  * @response {Object} 404 - Card not found.
  * @response {Object} 500 - Internal server error if something goes wrong.
  */
  this.route.delete('/card/:id', auth, deleteCard(this));

}
