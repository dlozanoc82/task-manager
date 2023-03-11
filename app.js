// Imports 
require('colors');

const { guardarDB, leerDB } = require('./helpers/saveFile');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmar} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

// Function Main App
const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Print the Menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //Create Task
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;   

            case '3':
                tareas.isCompleted(true);
            break;   
            
            case '4':
                tareas.isCompleted(false);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0') {
                
                    const ok = await confirmar('¿Está seguro de Borrar la Tarea?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }

                }

            break;
            
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();