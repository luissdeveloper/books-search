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
    document.addEventListener('DOMContentLoaded',() => showBooks(books));

    // Eventlisteners

    editorial.addEventListener('input',e => {
        datosBusqueda.editorial = e.target.value;

        booksFilter();
    });

    category.addEventListener('input', e => {
        datosBusqueda.category = e.target.value;

        booksFilter();
    });

    year.addEventListener('input', e => {
        datosBusqueda.year = e.target.value;

        booksFilter();
    });

    language.addEventListener('input',e => {
        datosBusqueda.language = e.target.value;

        booksFilter();
    });

    author.addEventListener('input', e => {
        datosBusqueda.author = e.target.value;

        booksFilter();
    });

    pages.addEventListener('input',e=>{
        datosBusqueda.pages = e.target.value;

        booksFilter();
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

function showBooks(books){
    cleanHTML();
    const contenedor = document.querySelector('#results');

    books.forEach(book =>{
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `<span class='book-name'>${book.name}</span>: Escrito por ${book.author}, publicado por la editorial ${book.editorial} en el ${book.year}. Contiene ${book.pages} páginas.`;
        contenedor.appendChild(parrafo);
    });
}


// Filtrar libros
function booksFilter(){

    cleanHTML();

    const resultsQuery = books.filter(editorialFilter).filter(categoryFilter).filter(authorFilter).filter(yearFilter).filter(pagesFilter).filter(languageFilter);

    if(resultsQuery.length > 0){
        showBooks(resultsQuery);
    }else{
        withoutResults();
    }
}


// Filtros independientes

function editorialFilter(book){
    if(datosBusqueda.editorial){
        return book.editorial == datosBusqueda.editorial;
    }

    return book;
}

function categoryFilter(book){
    if(datosBusqueda.category){
        return book.category == datosBusqueda.category;
    }

    return book;
}

function authorFilter(book){
    if(datosBusqueda.author){
        return book.author == datosBusqueda.author;
    }

    return book;
}

function yearFilter(book){
    if(datosBusqueda.year){
        return book.year == datosBusqueda.year;
    }

    return book;
}

function pagesFilter(book){
    if(datosBusqueda.pages){
        return book.pages == datosBusqueda.pages;
    }

    return book;
}

function languageFilter(book){
    if(datosBusqueda.language){
        return book.language == datosBusqueda.language;
    }

    return book;
}

function cleanHTML(){

    const rs = document.querySelector('#results');

    while(rs.firstChild){
        rs.removeChild(rs.firstChild);
    }

}
function withoutResults(){
    cleanHTML();
    const noResults = document.createElement('p');
    noResults.classList.add('nothing');
    noResults.appendChild(document.createTextNode('Sin resultados. Intenta con una nueva consulta'));
    document.querySelector('#results').appendChild(noResults);
}