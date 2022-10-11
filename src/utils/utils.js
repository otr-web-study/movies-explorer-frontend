export const checkAndSetJWT = (data) => {
  if (data.token) {
    localStorage.setItem('jwt');
  }
  throw new Error('Сервер вернул пустой токен');
}

export const checkAndSetUserData = (data, callback) => {
  if (!data) {
    throw new Error('Ответ сервера не содержит данные пользователя');
  }
  callback(data);
}