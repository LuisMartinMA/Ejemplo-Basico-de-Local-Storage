//variablas
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListeners();
function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //cuando carga el documento
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        crearHTML();
    });
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
    const tweetObj = {
        id: Date.now(),
        tweet
    }
   //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
   // una ves  agregado vamos a crear el html
    crearHTML();

    formulario.reset();

}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
   
    
    //elimina la alerta despues de 2 segundos
   setTimeout(() => {
       mensajeError.remove();
   }, 2000);
    
}


function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            //añadir una funcion de eliminarbtnE
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
        
            //crear el html
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
             //asignar el boton
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}