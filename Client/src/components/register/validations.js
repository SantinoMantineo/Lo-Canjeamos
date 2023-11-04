export function validateUsername(username) {
  if (username === '') {
    return "Debes completar el campo";
  }
  if (username.length < 3) {
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }
  if(username.length > 30){
    return "El nombre del usuario no debe superar los 30 caracteres"
  }
  return null; // Si no hay errores de validación
}

export function validateEmail(email) {
  if (email === '') {
      return "Debes completar el campo";
    }
    if (!/^\S+@\S+\.\S{2,}$/.test(email)) {
      return "Ingrese una dirección de correo electrónico válida" 
    }
  return null; // Si no hay errores de validación
}

export function validatePassword(password) {
  if (password === '') {
      return "Debes completar el campo";
    }
    if (password.length < 6 || password.length > 20) {
      return "El nombre de usuario debe tener entre 6 y 20 caracteres";
    }
  // if (!/^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,20}/.test(password)) {
  //   return "La contraseña debe contener entre 6-20 caracteres y al menos un numero ";
  // }
  return null; // Si no hay errores de validación
}
;
export function validateImagen(image) {
  if (image === '') {
    return "Debes completar el campo";
  } else if (!isValidImageUrl(image)) {
    return "La URL de la imagen debe terminar en .png o .jpg";
  }
  return null; // Si no hay errores de validación
}
function isValidImageUrl(url) {
  const urlPattern = /\.(png|jpg)$/i; // Patrón para verificar si la URL termina en .png o .jpg
  return urlPattern.test(url);
}

export function validateProvince(province) {
  if (!province || province === "Elige una provincia") {
    return "Seleccione una provincia";
  }
  return null; // Si no hay errores de validación
}

// Función de validación para el campo de localidad
export function validateLocalidad(locality) {
  if (!locality || locality === "Elige una localidad") {
    return "Seleccione una localidad";
  }
  return null; // Si no hay errores de validación
}

export const validatePasswordRepeat = (passwordRepeat, password) => {
if (passwordRepeat === '') {
  return "Debes completar el campo";
} else if (passwordRepeat !== password) {
  return "Las contraseñas no coinciden";
}
return null;
};

// if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/.test(password)) {}