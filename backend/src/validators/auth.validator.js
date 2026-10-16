const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const validateRegister = ({ email, password, fullName }) => {
  const errors = [];
  if (!isNonEmptyString(fullName)) errors.push('fullName es obligatorio');
  if (!isNonEmptyString(email)) errors.push('email es obligatorio');
  else if (!EMAIL_REGEX.test(email)) errors.push('Formato de email inválido');
  if (!isNonEmptyString(password)) errors.push('password es obligatorio');
  else if (password.length < MIN_PASSWORD_LENGTH) errors.push('La contraseña debe tener al menos 8 caracteres');
  return errors;
};

module.exports = { validateRegister };
