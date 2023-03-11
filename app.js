require('colors');

const { 
    inquirerMenu, 
    pausa, 
    leerInput } = require('./helpers/inquirer');
const { guardarDB } = require('./helpers/saveFile');

    const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    do {
        //Imprime el Menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2':
                console.log(tareas.listadoArr);
            break;   
        }

        // guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
    
    //pausa();
}

main();