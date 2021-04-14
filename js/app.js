//variablas
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

}

//funciones
function agregarTweet(e) {
    e.preventDefault();
    

    //variable de el tex area
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio');
        return;
    }
   
    

}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
}    