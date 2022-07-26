require('dotenv').config();

const { PORT = 3001, JWT_SECRET = 'dev-key' } = process.env;

const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
