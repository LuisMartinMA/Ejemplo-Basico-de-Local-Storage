"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//variablas
var formulario = document.querySelector('#formulario');
var listaTweets = document.querySelector('#lista-tweets');
var tweets = []; //event listener

eventListeners();

function eventListeners() {
  //cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweet); //cuando carga el documento

  document.addEventListener('DOMContentLoaded', function () {
    tweets = JSON.parse(localStorage.getItem('tweets') || []);
    crearHTML();
  });
} //funciones


function agregarTweet(e) {
  e.preventDefault(); //variable de el tex area

  var tweet = document.querySelector('#tweet').value;
  console.log(tweet);

  if (tweet === '') {
    mostrarError('un mensaje no puede ir vacio');
    return;
  }

  var tweetObj = {
    id: Date.now(),
    tweet: tweet
  }; //añadir al arreglo de tweets

  tweets = [].concat(_toConsumableArray(tweets), [tweetObj]); // una ves  agregado vamos a crear el html

  crearHTML();
  formulario.reset();
} //mostrar mensaje de error


function mostrarError(error) {
  var mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  var contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError); //elimina la alerta despues de 2 segundos

  setTimeout(function () {
    mensajeError.remove();
  }, 2000);
}

function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach(function (tweet) {
      //agregar un boton de eliminar
      var btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'x'; //añadir una funcion de eliminarbtnE

      btnEliminar.onclick = function () {
        borrarTweet(tweet.id);
      }; //crear el html


      var li = document.createElement('li');
      li.innerText = tweet.tweet; //asignar el boton

      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function borrarTweet(id) {
  tweets = tweets.filter(function (tweet) {
    return tweet.id !== id;
  });
  crearHTML();
}