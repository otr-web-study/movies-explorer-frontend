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
export const MESSAGE_USER_DATA_UPDATED = 'Данные пользователя успешно обновлены.';
export const MESSAGE_NOTHING_FOUND = 'Ничего не найдено.';
export const MESSAGE_API_ERROR = 'Во время запроса произошла ошибка. '
                                 + 'Возможно, проблема с соединением '
                                 + 'или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const ESC_KEY = 'Escape';
export const ENTER_KEY = 'Enter';
export const DURATION_SHORT_MOVIE = 40;
export const WIDTH_DESKTOP = 1280;
export const WIDTH_MIDDLE = 480;
export const MOVIES_LIMIT = {
  DESKTOP: { COUNT: 12, MORE: 3},
  MIDDLE: {COUNT: 8, MORE: 2},
  MOBILE: {COUNT: 5, MORE: 2},
}