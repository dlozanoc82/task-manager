const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;

    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log();
        const listar = this.listadoArr;
        
        listar.forEach((tarea, i) => {

            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)

        })
    }

    isCompleted(completadas = true){

        console.log();
        const listar = this.listadoArr;
        let idx = 0

        listar.forEach( tarea => {

            const {desc, completadoEn} = tarea;

            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    idx +=1;
                    console.log(`${(idx+'.').toString().green} ${desc} :: ${completadoEn}`);
                }
            }
            else{
                if (!completadoEn) {
                    idx +=1;
                    console.log(`${(idx+'.').toString().red} ${desc} :: ${estado}`);
                }
            }
        })
    }

}

module.exports = Tareas;