import { 
  MESSAGE_EMPTY_TOKEN,
  MESSAGE_EMPTY_USER_DATA,
  MESSAGE_ERROR_VALIDATION,
  MESSAGE_WRONG_EMAIL_OR_PASSWORD,
  MESSAGE_ERROR_PAGE_NOT_FOUND,
  MESSAGE_ERROR_EMAIL_ALREADY_EXIST,
  MESSAGE_SERVER_ERROR,
  UNKNOWN_ERROR,
} from '../constants/constants';

export const checkAndSetJWT = ({token}) => {
  if (!token) {
    return Promise.reject(MESSAGE_EMPTY_TOKEN);
  }
  localStorage.setItem('jwt', token);
  return Promise.resolve();
}

export const checkAndSetUserData = (data, callback) => {
  if (!data) {
    return Promise.reject(MESSAGE_EMPTY_USER_DATA);
  }
  callback(data);
  return Promise.resolve();
}

export const getErrorMessage = (err) => {
  if (!err.status) {
    return String(err);
  }

  console.log(err.text);

  switch(err.status) {
  case 400:
    return MESSAGE_ERROR_VALIDATION;
  case 401:
    return MESSAGE_WRONG_EMAIL_OR_PASSWORD;
  case 404:
    return MESSAGE_ERROR_PAGE_NOT_FOUND;
  case 409:
    return MESSAGE_ERROR_EMAIL_ALREADY_EXIST;
  case 500:
    return MESSAGE_SERVER_ERROR;
  default:
    return UNKNOWN_ERROR;
  }
}
