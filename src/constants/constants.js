export const MAIN_BASE_URL = 'http://localhost:3000';
export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const USER_FRIENDLY_ERRORS = {
  400: 'Ошибка валидации на сервере',
  401: 'Вы ввели неправильный логин или пароль.',
  404: 'Страница по указанному маршруту не найдена.',
  409: 'Пользователь с таким email уже существует.',
  500: 'На сервере произошла ошибка.',
}
export const MESSAGE_EMPTY_TOKEN = 'Сервер вернул пустой токен.';
export const MESSAGE_EMPTY_USER_DATA = 'Ответ сервера не содержит данные пользователя.';