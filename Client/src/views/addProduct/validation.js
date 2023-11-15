  export function validateTitle(title) {
    if (title.trim() === "") {
      return "El título es obligatorio";
    } else if(title.length < 3 ){
    return "El titulo debe contenter mas de 3 caracteres";
    }else if(title.length > 30 )
    return "El titulo no debe contenter mas de 30 caracteres";
  }

  export function validateDescription(description) {
    if (description.length > 250) {
      return "La descripción no puede superar los 250 caracteres";
    }
    return "";
  }