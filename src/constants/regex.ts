const alphabetRegex = /[a-z.]+$/;

const alphaNumericRegex = /^[a-z0-9]+$/i;

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[012])$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const identificationNumberRegex = /^[0-9-/]+$/;

const mobileRegex = /^$|^9[78]\d{8}$/;

const nepaliRegex = /^[^a-zA-Z0-9]*$/;
const nepaliNameRegex = /^[\u0900-\u097F. ]+$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const bankAccountNumberRegex = /^[a-zA-Z0-9-/]+$/;

export {
  alphabetRegex,
  alphaNumericRegex,
  dateRegex,
  emailRegex,
  identificationNumberRegex,
  mobileRegex,
  nepaliNameRegex,
  nepaliRegex,
  passwordRegex,
  bankAccountNumberRegex,
};