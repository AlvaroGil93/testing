import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";

// 2. Definir los bloques de prueba, usamos el describe.
describe('Pruebas de los controladores de los usuarios', () => {

    /*
    Configuración global de las pruebas:
        - beforeEach: Se ejecuta antes de cada prueba para realizar acciones necesarias, como limpiar la base de datos.
        - afterAll: Se ejecuta al finalizar todas las pruebas para realizar acciones de cierre, como desconectar la base de datos.
    */

    // Limpiar la base de datos antes de cada prueba.
    beforeEach(async () => {
        // Borra todos los documentos almacenados en la colección de usuarios.
        await userModel.deleteMany({});
    });

    // Cerrar la conexión con MongoDB después de que todas las pruebas hayan finalizado.
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Definimos un objeto que representará a un usuario de prueba.
    const testUser = {
        fullName: 'Juan Rodriguez',
        email: 'juan@gmail.com',
        password: '123'
    };

    // 2.1 Defino el bloque de pruebas para la petición POST.
    describe('Pruebas POST /users', () => {

        /*
        Casos a probar para la petición POST:
            - Casos exitosos: como la creación de un usuario correctamente.
            - Casos fallidos: como el intento de crear un usuario con datos incompletos.
        */

        // Caso 1: Creación de usuarios de forma exitosa.
        it('Debería crear un usuario correctamente', async () => {
            // Realizamos la petición POST enviando los datos del usuario de prueba.
            const res = await supertest(app).post('/usuarios').send(testUser);

            // Verificamos que la respuesta tenga un código de estado 201 (creado exitosamente).
            expect(res.statusCode).toBe(201);
        });

        // Caso 2: Error cuando falta un campo obligatorio al crear un usuario.
        it('Debería devolver un error si falta un campo obligatorio', async () => {
            // Realizamos la petición POST enviando un objeto incompleto (sin fullName).
            const res = await supertest(app).post('/usuarios').send({ email: testUser.email });

            // Verificamos que la respuesta contenga un mensaje de error adecuado.
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear un usuario');
        });
    });

    // 2.2 Defino el bloque de pruebas para la petición GET.
    describe('Pruebas GET /users', () => {

        /*
        Casos a probar para la petición GET:
            - Cuando no hay usuarios almacenados.
            - Cuando existen usuarios almacenados y queremos obtenerlos correctamente.
        */

        // Caso 1: Indicar que no hay usuarios almacenados en la base de datos.
        it('Debería indicar que no hay usuarios almacenados', async () => {
            // Realizamos la petición GET a la ruta de usuarios.
            const res = await supertest(app).get('/usuarios');

            // Verificamos que el código de estado sea 200 (respuesta exitosa).
            expect(res.statusCode).toBe(200);

            // Verificamos que la respuesta contenga el mensaje esperado.
            expect(res.body).toHaveProperty('mensaje', 'No hay usuarios almacenados');
        });

        // Caso 2: Obtener usuarios almacenados.
        // Nota: Para este caso, primero se debe guardar un usuario en la base de datos.
        // it('Debería devolver los usuarios almacenados', async () => {
        //     // Guardamos un usuario de prueba en la base de datos.
        //     await new userModel(testUser).save();

        //     // Realizamos la petición GET a la ruta de usuarios.
        //     const res = await supertest(app).get('/usuarios');

        //     // Verificamos que el código de estado sea 200.
        //     expect(res.statusCode).toBe(200);

        //     // Verificamos que se obtenga un arreglo con los usuarios almacenados.
        //     expect(res.body).toBeInstanceOf(Array);
        //     expect(res.body.length).toBe(1);
        //     expect(res.body[0]).toHaveProperty('email', testUser.email);
        // });
    });
});
