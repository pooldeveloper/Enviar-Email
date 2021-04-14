//Variables
const btnEnviar = document.querySelector('#enviar')
const formulario = document.querySelector('form')
const btnResetear = document.querySelector('#resetBtn')  
//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


addEventListener()
function addEventListener(){
    document.addEventListener('DOMContentLoaded',iniciarApp);
    //Campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
    btnResetear.addEventListener('click', iniciarApp);
}

//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

//Validar Formulario

function validarFormulario(e){
   if(e.target.value.length > 0){
       //Eliminar los errores
       const error = document.querySelector('p.error');
       if(error){
            error.remove();
       }
       e.target.classList.remove('border-red-500');
       e.target.classList.add('border-green-500');
   }else{
       e.target.classList.remove('border-green-500');
       e.target.classList.add('border-red-500');
       mostrarError('Todos los campos son obligatorios');
   }
   if(e.target.type === 'email'){
       if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border-red-500');
            e.target.classList.add('border-green-500');
       }else{
            e.target.classList.remove('border-green-500');
            e.target.classList.add('border-red-500');
            mostrarError('El email no es valido');
       }
   }

   if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
       btnEnviar.disabled = false;
       btnEnviar.classList.remove('opacity-50', 'cursor-not-allowed');
   }
}

//Mostar error
function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('bg-red-100', 'border', 'border-red-500', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

//Enviar email
function enviarEmail(e){
    e.preventDefault();
    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    //setInterval ejecuta cada intervalo la accion 
    //sestTimeout ejecuta solo una vez la accion
    setTimeout(()=>{
        spinner.style.display = 'none';
        mostrarEnviado();
    }, 3000);
}

//Mostrar enviado
function mostrarEnviado(){
    const mensajeEnviado = document.createElement('p');
    mensajeEnviado.textContent = 'Su mensaje fue enviado con exito';
    mensajeEnviado.classList.add('bg-green-500', 'border', 'border-green-800', 'text-white', 'p-2', 'my-10', 'text-center','uppercase','font-bold');
    //Insertar el parrafo antes del spinner
    formulario.insertBefore(mensajeEnviado, spinner);
    //Eliiminar mensaje enviado lueggo de 5s
    setTimeout(()=>{
        mensajeEnviado.remove()
        formulario.reset()
    },5000)
}