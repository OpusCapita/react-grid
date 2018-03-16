const PREFIX = 'Validation.';

const isNotDefined = val => (
  val === '' || val === null || val === undefined
);

export const isRequired = (value) => {
  if (isNotDefined(value)) {
    return { valid: false, message: `${PREFIX}IsRequired` };
  }
  return { valid: true };
};

export const minLength = (value, length) => {
  if (isNotDefined(value)) {
    return { valid: true };
  }
  if (value.length < length) {
    return { valid: false, message: `${PREFIX}MinLength` };
  }
  return { valid: true };
};

export const maxLength = (value, length) => {
  if (isNotDefined(value)) {
    return { valid: true };
  }
  if (value.length > length) {
    return { valid: false, message: `${PREFIX}MaxLength` };
  }
  return { valid: true };
};

export const minValue = (value, minimumValue) => {
  if (isNotDefined(value)) {
    return { valid: true };
  }
  if (value < Number(minimumValue)) {
    return { valid: false, message: `${PREFIX}MinValue` };
  }
  return { valid: true };
};

export const maxValue = (value, maximumValue) => {
  if (isNotDefined(value)) {
    return { valid: true };
  }
  if (value > Number(maximumValue)) {
    return { valid: false, message: `${PREFIX}MaxValue` };
  }
  return { valid: true };
};
