export const LOGIN_MENSAJES = {
  incompletos: "Completá tu email y contraseña para continuar.",
  emailVacio: "Debés ingresar tu correo electrónico.",
  passwordVacio: "Debés ingresar tu contraseña.",
  credenciales: "No pudimos iniciar sesión. Revisá tu email y tu contraseña e intentá de nuevo.",
  inactivo: "Tu cuenta está inactiva. Escribinos para reactivarla.",
  conexion: "No pudimos conectarnos. Intentá de nuevo en unos minutos.",
  servidor: "Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.",
};

export const REGISTER_MENSAJES = {
  incompletos: "Completá todos los campos obligatorios para continuar.",
  nombreVacio: "Ingresá tu nombre completo.",
  emailVacio: "Ingresá tu correo electrónico.",
  emailInvalido: "Ingresá un formato de email válido.",
  passwordVacio: "Ingresá una contraseña.",
  passwordCorta: (min) => `Usá al menos ${min} caracteres.`,
  confirmPasswordVacio: "Confirmá tu contraseña.",
  passwordNoCoincide: "Las contraseñas no coinciden.",
  emailDuplicado: "Este email ya tiene una cuenta. Probá iniciar sesión.",
  datosInvalidos: "Revisá los datos que cargaste e intentá de nuevo.",
  conexion: "No pudimos conectarnos. Intentá de nuevo en unos minutos.",
  servidor: "Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.",
};