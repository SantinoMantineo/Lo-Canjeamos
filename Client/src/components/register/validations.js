export function validateUsername(username) {
    if (username === '') {
      return "Debes completar el campo";
    }
    if (username.length < 3) {
      return "El nombre de usuario debe tener al menos 3 caracteres";
    }
    return null; // Si no hay errores de validación
  }
  
  export function validateEmail(email) {
    if (email === '') {
        return "Debes completar el campo";
      }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Ingrese una dirección de correo electrónico válida";
    }
    return null; // Si no hay errores de validación
  }
  
  export function validatePassword(password) {
    if (password === '') {
        return "Debes completar el campo";
      }
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return null; // Si no hay errores de validación
  }
  
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
    return null; // Si no hay errores de validación
  }