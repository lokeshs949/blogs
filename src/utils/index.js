export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const getLocalStorage = (key) => {
  let value = localStorage.getItem(key);
  return value;
};
export const deleteLocalStorage = (key) => {
  let value = localStorage.removeItem(key);
  return value;
};
export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
