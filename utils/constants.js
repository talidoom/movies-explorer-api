const CREATED_CODE = 201;

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

// Регулярное выражение
const urlRegexPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Секретный ключ для разработки
const SECRET_KEY_DEV = 'dev-secret';

module.exports = {
  CREATED_CODE,
  STATUS_CODES,
  urlRegexPattern,
  SECRET_KEY_DEV,
};
