// las pruebas unitarias testean funciones


//1. importar dependencias, servicios,funciones
import suma from "../src/utils/ejemplo.js";

//2. definir un bloque de pruebas -> funcion suma
/*
 PALABRAS RESERVADAS PARA HACER PRUEBAS SON:
 Describe -> agrupar el bloque de prueba

 it -> define casos individuales dentro de cada bloque de pruebas
Expect - toBe -> Que es lo que queremos que suceda -> definimps cual es la repuesta que deb suceder


 */
//1. paso una descripcion y luego una funcion flecha

describe('probar la funcion suma' , ()=>{
//aca esta nuestro bloque de pruebas

// caso de prueba 1: se suma numeros positivos
//1.describo que es lo que quiero que suceda
//2. definir lo que espero que suceda

it('deberia suma dos numero positivos,correctamente',()=>{
expect(suma(5,2)).toBe(7);
});

// caso de prueba 2-> se sumen numeros negativos

it('debería sumar dos números negativos correctamente', () => {
    expect(suma(-2, -4)).toBe(-6); // Verifica que -2 + (-4) es igual a -6
});
});