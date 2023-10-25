//?VALIDACIONES
const validate = (form) => {
    let errors = {}

    if (!form.nombre) {
      errors.nombre = 'Insert a valid nombre';
    } else if (!/^[a-zA-Z\s]+$/.test(form.nombre)) {
      errors.nombre = 'The name must only contain letters and spaces';
    } else if (form.nombre.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.nombre = 'The name is too long. Maximum length is 50 characters.';
    }
    if (!form.apellido) {
      errors.apellido = 'Insert a valid apellido';
    } else if (!/^[a-zA-Z\s]+$/.test(form.apellido)) {
      errors.apellido = 'The name must only contain letters and spaces';
    } else if (form.apellido.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.apellido = 'The name is too long. Maximum length is 50 characters.';
    }    
    
    if (!form.provincia) {//PROVINCIA
      errors.nacionalidad = 'Insert a valid nacionalidad';
    } else if (!/^[a-zA-Z\s]+$/.test(form.nacionalidad)) {
      errors.nacionalidad = 'The nacionalidad must only contain letters and spaces';
    } else if (form.nacionalidad.length > 50) { // Cambia 50 al número máximo de caracteres permitidos
      errors.nacionalidad = 'The name is too long. Maximum length is 50 characters.';
    } 

    if (!form.descripcion) {
      errors.descripcion = 'Insert a valid descripcion'
    } else if (form.descripcion.length < 10) {
      errors.descripcion = 'descripcion must be at least 10 characters';
    }

    if (!form.image) {
      errors.image = 'Insert a date of birth'
    } else if (!form.image.startsWith('https://') && !form.image.startsWith('http://')){
       errors.image = 'Insert a valid URL image' 
    }

    if (!form.FechaDeNacimiento) {
      errors.FechaDeNacimiento = 'Insert a valid date of birth';
    } else {
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  
      // Compara la fecha de nacimiento con la fecha mínima permitida
      if (new Date(form.FechaDeNacimiento) > minDate) {
        errors.FechaDeNacimiento = 'You must be at least 18 years old.';
      }
    }

    return errors;
  }