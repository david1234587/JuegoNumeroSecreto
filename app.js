
/*let titulo = document.querySelector('h1');     // Declaramos titulo como el objeto que se creo en HTML como <h1></h1>
titulo.innerHTML = 'Juego del numero secreto'; // Al 'titulo' le asignamos un texto

let parrafo = document.querySelector('p');                // Declaramos parrafo como el objeto creado en HTML como <p></p>
parrafo.innerHTML = ('Selecciona un numero del 1 al 10'); // Al 'parrafo' le podemos asignar un texto.
*/

// para ahorrar las 2 lineas de arriba y no declarar cada variable cada vez que se llama a una nueva se crea esta funcion que especifica
// que puedes agregar el texto a los objetos respetanto el formato de lllamar a elemento y despues el texto 

let numeroSecreto = 0; 
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {       //declaramos la funcion que se ejecuta en HTML declaras que acccion realizara.
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //tarea que se va a realizar cuando se cumpla lo declarado en HTML
    

    if(numeroDeUsuario === numeroSecreto){ //condicional para indicar si el intento o numero indicado es mayor o menor 
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`); // ? operador ternario para seleccionar singular o plural en texto ? if y : else
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acerto
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero es menor');
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    
}

function generarNumeroSecreto() { //esta fucion al ejecutarse regresa un valor aleatorio generado con Ma    th.random
        let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;  //Math.floor solo deja parte entera del numero y Math.random genera numero aleatorio del 0 a 9.99 se suma 1 para que genere numero de 1 a 10 
        
        if (listaNumerosSorteados.length == numeroMaximo){  // si ya sorteaste todos los numeros 
            asignarTextoElemento('p','Se sortearon todos los numeros posibles')  //se indica que ya fueron sorteados todos los numeros
        } else {
            if (listaNumerosSorteados.includes(numeroGenerado)) {  // Si el numero generado esta incluido en la lista 
                return generarNumeroSecreto();  // se genera un nuevo numero si ya se encuentra en la lista se llama una recursividad
            } else {
                listaNumerosSorteados.push(numeroGenerado); //si no puedes jugar y se agrega a la lista para tenerlo en el arreglo
                return numeroGenerado;
            }
        }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'juego del numero secreto!'); //al quedar la funcion solo hace falta respetar el formato para agregar el texto a nuestro objeto.
    asignarTextoElemento('p', `Selecciona un numero del 1 al ${numeroMaximo}`); //solo se cambia el nombre del objeto declarado 'h1' 'p' etc, y se inserta el texto que se requiere.
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();           // Limpiar la caja de numeros
    condicionesIniciales();  // Indicar mensaje de inicio de intervalo de numeros, Inicializar el numero de intentos, generar el numero aleatorio 
    document.querySelector('#reiniciar').setAttribute('disabled','true'); // Desabilitar el boton de nuevo juego

}

condicionesIniciales();


