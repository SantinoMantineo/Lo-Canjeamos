// export const validateUser = (username) => {
//     if(!username){
//      return 'Porfavor inserte un usuario valido'
//     }
//     return null
// }
// export const validatePassw = (password) => {
//     if(!password){
//      return 'Complete con una contraseña correcta'
//     }
//     return null
//  }

//  export const validateLogin = (username, password) => {
//     if(username && !password){
//         return 'La contraseña es incorrecta'
//     } else if (!username){
//         return 'Porfavor inserte un usuario valido'
//     }
//         return null

// } 
 

export const validateLogin = (username, password) => {
    const errors = {};
  
    if (!username) {
      errors.username = 'Por favor, ingrese un usuario válido';
    }
  
    if (!password) {
      errors.password = 'La contraseña es incorrecta';
    }
  
    return errors;
  };