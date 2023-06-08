module.exports = Object.freeze({
  BAD_REQUEST: 'Некорректный запрос',
  NOT_FOUND: 'Ничего не смогли найти',
  INTERNAL_SERVER_ERROR: 'Ошибка сервера',
  ACCESS_DENIED: 'Нет прав',
  ALREADY_EXIST: 'Такой пользователь уже есть :(',
  UNAUTHORIZED: 'Необходимо войти',
  REGEXPHTTP: /^(http(s):\/\/.)[-a-zA-Z0-9:%._+~#=]{2,256}\/[-a-zA-Z0-9:%._+~#=]{2,256}/,
});
