"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const del = require("del");
const loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        });
    });
};
exports.loadCollection = loadCollection;
//Filtro para archivos
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;
//=======Funcion para limpiar las imagenes subidas durante el Desarollo =======
const cleanFolder = function (folderPath) {
    //borra los archivos pero no el folder
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};
exports.cleanFolder = cleanFolder;
//# sourceMappingURL=utils.js.map