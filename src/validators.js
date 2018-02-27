export const required = value => (value ? undefined : "Required");

export const exactLength = length => value =>
  value && value.length != length ? `Must be ${length} characters` : undefined;

export const length9 = exactLength(9);

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength9 = maxLength(9);
export const maxLength120 = maxLength(120);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength3 = minLength(3);
export const minLength9 = minLength(9);

export const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const minValue9 = minValue(9);

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const tooOld = value =>
  value && value > 65 ? "You might be too old for this" : undefined;

export const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? "Really? You still use AOL for your email?"
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;
