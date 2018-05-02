"use strict";
//index
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Loki = require("lokijs");
const utils_1 = require("./utils");
//setup db
const DB_NAME = 'dbjson';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: utils_1.imageFilter }); // configuracion de multer//Filtro de selecion
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
//setup app
const app = express();
app.use(cors());
//==============Subir imagen de perfil ===============

function profile (req, res){
  console.log('entro');
  app.post('./', upload.single('avatar'), (req, res) => __awaiter(this, void 0, void 0, function* () {
      try {
          console.log('aqui');
          const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
          const data = col.insert(req.file);
          db.saveDatabase();
          console.log('paso en la base ');
          res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
      }
      catch (err) {
          res.sendStatus(400);
          console.log(err);
      }
  }));



app.post('/profile', upload.single('avatar'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log('pasa por aca');
    try {
        const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);
        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    }
    catch (err) {
        res.sendStatus(400);
    }
}));

}


//===========Subir varios Archivos ===================
app.post('/photos/upload', upload.array('photos', 12), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
        let data = [].concat(col.insert(req.files));
        db.saveDatabase();
        res.send(data.map(x => ({ id: x.$loki, fileName: x.filename, originalName: x.originalname })));
    }
    catch (err) {
        res.sendStatus(400);
    }
}));
app.get('/images', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    }
    catch (err) {
        res.sendStatus(400);
    }
}));
//======Busca y devuelme imagen por id ==========
app.get('/images/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
        const result = col.get(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        ;
        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    }
    catch (err) {
        res.sendStatus(400);
    }
}));
//borrar todos los archivos subidos
utils_1.cleanFolder(UPLOAD_PATH);

module.exports = {
  profile,

}
/*//======================port=======================
app.listen(3000, function () {
    console.log('listening on port 3000!');
});*/
//# sourceMappingURL=index.js.map
