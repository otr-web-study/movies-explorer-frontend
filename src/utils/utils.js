import { 
  MESSAGE_EMPTY_TOKEN,
  MESSAGE_EMPTY_USER_DATA,
  USER_FRIENDLY_ERRORS,
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
  return USER_FRIENDLY_ERRORS[err.status];
}
