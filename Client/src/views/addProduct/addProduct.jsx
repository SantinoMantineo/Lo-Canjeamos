import React from 'react'
// import provincia from './validation.js'
import style from './AddProduct.module.css'

const AddProduct = () => {
 
  return (
    <><div className={style.contenedor}>
      <div className={style.title}>
            <h2>Que vas a cambiar?</h2>
      </div>
        <div className={style.image} ></div>
      <div >
        <form  className={style.contenedor}>
          <div className={style.Derecho}>
              
              <div className={style.inputBox} >
                  {/* Nombre */}   
                    <input type="text" name='nombre' required="required"/>
                    <span>Nombre</span>
              </div>

              <div className={style.inputBox} >
                  {/* Descripcion */}
                    <textarea name="descripcion"  cols="30" rows="10" placeholder='Describe tu articulo' required="required"></textarea>
                    
              </div>

              <div className={style.inputBox} >
                  {/* fotos */}
                    <input required="required"type="text"name='fotos'/>
                    <span>Foto</span>
              </div>     
          </div>
          
          <div className={style.izquiedo}>
            <div className={style.inputBox} >
                {/* Provincia */}
                  <input required="required" type="text"name='provincia'/>
                  <span>Provincia</span>
            </div>

            <div className={style.inputBox} >
                {/* Cuidad */}
                  <input required="required" type="text"name='ciudad'/>
                  <span>Cuidad</span>
            </div>

            <div className={style.inputBox} >
                {/* categoria */}
                  <input required="required" type="text"name='categoria'/>
                  <span>Categoria</span>
            </div>

          <div>
            <button type='submit' className={style.button}>Publicar!</button>
          </div>
          </div>

        </form>
      </div>{/* div de form */}
      
      </div>
    </>
  )

}

export default AddProduct