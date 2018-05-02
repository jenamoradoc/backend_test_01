import * as del from 'del';
import * as Loki from 'lokijs';

const loadCollection = function (colName, db: Loki): Promise<Collection<any>> {
  return new Promise(resolve =>{
      db.loadDatabase({}, () =>{
         const _collection = db.getCollection(colName) || db.addCollection(colName);
         resolve(_collection);
    })
  });
}

//Filtro para archivos
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

//=======Funcion para limpiar las imagenes subidas durante el Desarollo =======

const cleanFolder = function (folderPath){

   //borra los archivos pero no el folder
   del.sync([`${folderPath}/**`, `!${folderPath}`]);
}


export { imageFilter, loadCollection, cleanFolder}
