// validationUtils.js

export const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

export const isValidName = (name) => /^[a-zA-Z-'\s]+$/.test(name);

export const isValidPassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
