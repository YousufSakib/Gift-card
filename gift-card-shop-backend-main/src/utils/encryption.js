import crypto from 'crypto';
import settings from '../settings';

const algorithm = 'aes-256-cbc';
const secret = settings.secret || 'default_secret_key_32_chars_long';
const key = crypto.createHash('sha256').update(secret).digest();
const iv = crypto.randomBytes(16);

export function encryptCardCode(cardCode) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(cardCode, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const ivHex = iv.toString('hex');
  return `${ivHex}:${encrypted}`;
}

export function decryptCardCode(encryptedCardCode) {
  const [ivHex, encrypted] = encryptedCardCode.split(':');
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
