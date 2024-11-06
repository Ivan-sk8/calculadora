const pantalla = document.querySelector('.pantalla')
let operacion_pendiente = '';
let numero_anterior = '';
let operador_actual = null;
let reiniciar_pantalla = false;

function agregar(valor){
    if (reiniciar_pantalla){
        pantalla.value = '';
        reiniciar_pantalla = false;

    }
        if(["+", "-", "*", "/", "√"].includes(valor)){
            if(operador_actual !== null){
                calcular();
            }
            numero_anterior = pantalla.value;
            operador_actual = valor;
            reiniciar_pantalla = true;
        }else{
            pantalla.value += valor;
        }
    }


function limpiar(){
    pantalla.value = '';
    operacion_pendiente = '';
    numero_anterior = '';
    operador_actual = null;
}
function regresar(){
    pantalla.value = pantalla.value.slice(0, -1);
}

function calcular(){
    if(operador_actual === null){
        return;
    }
    const numero_1 = parseFloat(numero_anterior);
    const numero_2 = parseFloat(pantalla.value)

    if(isNaN(numero_1) || isNaN(numero_2)){
        pantalla.value
        setTimeout(limpiar, 1500);
        return;
    }

    let resultado;
    switch(operador_actual){
        case '+':
            resultado = numero_1 + numero_2
            break;
        case '-':
            resultado = numero_1 - numero_2
            break;
        case '*':
            resultado = numero_1 * numero_2
            break;
        case '/':
            resultado = numero_1 / numero_2
            break;
        case '√':
            resultado = Math.sqrt(numero_2);
            break;
        default:
            pantalla.value = 'Error';
            return;
    }
// redondear decimales para evitar problemas de precision
    resultado = Math.round(resultado * 100000000) / 100000000;

    pantalla.value = resultado;
    operador_actual = null;
    numero_anterior = '';
    reiniciar_pantalla = true;
}

// eventos de teclado

document.addEventListener('keydown', (event) =>{
    event.preventDefault();
    const key = event.key;


    // numeros y operadores
    if(/[0-9\+\-\*\/\.]/.test(key)){
        agregar(key);
    }

    // tecla enter para calcular
    else if(key === 'Enter'){
        calcular();
    }

    // tecla escape para la limpiar
    else if(key === 'Escape'){
        limpar();
    }

    // tecla para borrar el ultimo caracter
    else if(key === 'Backspace'){
        regresar();
    }
});