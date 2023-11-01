const validation = ({username, password}) => {

    let errors = {};
 
    if(!username){
     errors.username = 'Porfavor inserte un usuario valido'
    }
 
    if(!password){
     errors.password = 'Contraseña incorrecta'
    }
    // if(password.trim().length < 6){
    //  errors.password = 'Your password requires at least 6 characters'
    // }
 
    return errors
 }
 
 export default validation;
