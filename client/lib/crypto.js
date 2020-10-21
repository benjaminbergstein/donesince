const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = (json) => {
  const text = JSON.stringify(json)
  console.log(text)
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decrypt = (text) => {
  const [ivText, encryptedData] = text.split(':')
  let iv = Buffer.from(ivText, 'hex');
  let encryptedText = Buffer.from(encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}
