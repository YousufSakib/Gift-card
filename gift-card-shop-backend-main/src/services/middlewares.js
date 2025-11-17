import decodeAuthToken from '../utils/decodeAuthToken';

/**
 * This function is used to authenticate request.
 * After authentication it inserts the user data to request object.
 */
export async function auth(req, res, next) {
  try {
    const token = req.cookies?.gift_card_shop || (process.env.NODE_ENV === 'development' ? req.header('Authorization')?.replace('Bearer ', '') : null);
    if (!token) return res.status(401).send({ status: 401, reason: 'Unauthorized' });
    const user = await decodeAuthToken(token);
    if (!user) return res.status(401).send({ status: 401, reason: 'Unauthorized' });
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ status: 401, reason: 'Unauthorized' });
  }
}
