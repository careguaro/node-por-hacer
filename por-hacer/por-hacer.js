const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar');
    });
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDb();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDb();
    return listadoPorHacer;
}

const actualizar = (desc, complete = true) => {
    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === desc;
    });

    console.log(index);

    if (index >= 0) {
        listadoPorHacer[index].completado = complete;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (desc) => {
    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === desc;
    });

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}