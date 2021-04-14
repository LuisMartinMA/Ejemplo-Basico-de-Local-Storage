"use strict";

//variablas
var formulario = document.querySelector('#formulario');
var listaTweets = document.querySelector('#lista-tweets');
var tweets = []; //event listener

eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);
} //funciones


function agregarTweet(e) {
  e.preventDefault(); //variable de el tex area

  var tweet = document.querySelector('#tweet').value;
  console.log(tweet);

  if (tweet === '') {
    mostrarError('un mensaje no puede ir vacio');
    return;
  }
} //mostrar mensaje de error


function mostrarError(error) {
  var mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  var contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);
}