// importar
import {books} from './db.js';

// Variables para seleccionar inputs
const editorial = document.querySelector('#editorial');
const category  = document.querySelector('#category');
const year      = document.querySelector('#year');
const language  = document.querySelector('#language');
const author    = document.querySelector('#author');
const pages     = document.querySelector('#pages');
const results   = document.querySelector('#results');

// Arreglos
let arrEditorial = [];
let arrCategory  = [];
let arrYear      = [];
let arrLanguage  = [];
let arrAuthor    = [];
let arrPages     = [];

// Crear eventos

loadedEvents();
function loadedEvents(){
    //Poblar selects
    document.addEventListener('DOMContentLoaded',poblarSelects);

    // Mostrar libros
    document.addEventListener('DOMContentLoaded',showBooks);

    // Eventlisteners

    editorial.addEventListener('input',e => {
        datosBusqueda.editorial = e.target.value;
    });

    category.addEventListener('input', e => {
        datosBusqueda.category = e.target.value;
    });

    year.addEventListener('input', e => {
        datosBusqueda.year = e.target.value;
    });

    language.addEventListener('input',e => {
        datosBusqueda.language = e.target.value;
    });

    author.addEventListener('input', e => {
        datosBusqueda.author = e.target.value;
    });

    pages.addEventListener('input',e=>{
        datosBusqueda.pages = e.target.value;
    })


}


// Función para poblar selects
function poblarSelects(){

    function poblar(prueba,arrDest,dest){
        let arrTemp = []
        books.forEach((edit)=>{
            arrTemp = [...arrTemp,edit[prueba]];
        });

        arrTemp.sort();
        arrTemp.forEach(book=>{
            if(arrDest.includes(book)){
                // console.log('Existe');
            }else{
                // console.log('No existe');
                arrDest = [...arrDest,book];
                const createOption = document.createElement('option');
                createOption.value = book;
                createOption.innerHTML = book;
                dest.appendChild(createOption);
            }    
        });
    }

    // Poblar editorial
    poblar('editorial',arrEditorial,editorial);

    // Poblar category
    poblar('category',arrCategory,category);

    // Poblar year
    poblar('year',arrYear,year);

    // Poblar language
    poblar('language',arrLanguage,language);

    // Poblar autor
    poblar('author',arrAuthor,author);

    // Poblar paginas
    poblar('pages',arrPages,pages);
}


// Busqueda

const datosBusqueda = {
    editorial : '',
    category  : '',
    author    : '',
    year      : '',
    pages      : '',
    language  : '',
}


// mostrar libros

function showBooks(){
    books.forEach(book =>{
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `<span class='book-name'>${book.name}</span>: Escrito por ${book.author}, publicado por la editorial ${book.editorial} en el ${book.year}. Contiene ${book.pages} páginas.`;
        results.appendChild(parrafo);
    });
}



// Filtros independientes

function editorialFilter(books){
    if(datosBusqueda.editorial){
        return books.editorial
    }
}