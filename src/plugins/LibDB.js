export var LibDB = /** @class */ (function () {
    var db;
    function LibDB(nombre, version, objeto) {
        localStorage.setItem("dbItems", JSON.stringify({ name: nombre, version: version }));
        var abrir = indexedDB.open(nombre, version);
        abrir.onupgradeneeded = function () {
            db = abrir.result;
            var nombreColeccion = [], objectName = db.objectStoreNames;
            //Averiguo los nombres de las colecciones, para luego comprobar si se deben crear o modificar
            for (var ele in objectName) {
                if (objectName[ele] !== "length" &&
                    objectName[ele] !== "item" &&
                    objectName[ele] !== "contains") {
                    nombreColeccion.push(objectName[ele]);
                }
            }
            //Recorro todo el objeto pasado como parametro y realizo las diferentes operaciones
            for (var _i = 0, objeto_1 = objeto; _i < objeto_1.length; _i++) {
                var obj = objeto_1[_i];
                var store = void 0, estaba = void 0;
                //Verifico si la colección que intento recorrer ya esta creada
                if (nombreColeccion.indexOf(obj.name) === -1) {
                    //Creo la colección
                    store = db.createObjectStore(obj.name, { keyPath: "key" });
                    estaba = false;
                }
                else {
                    //Abro la tansacción para realizar las debidas modificaciones
                    store = abrir.transaction.objectStore(obj.name);
                    estaba = true;
                }
                if (estaba) {
                    //En caso tal de que ya la colección ya estubiese creada
                    var nameIndices = [], n = store.indexNames;
                    //Busco los indices que ya estan creados
                    for (var arrayIndex in n) {
                        if (n[arrayIndex] !== "length" &&
                            n[arrayIndex] !== "item" &&
                            n[arrayIndex] !== "contains") {
                            nameIndices.push(n[arrayIndex]);
                        }
                    }
                    //Creo los indices
                    for (var _a = 0, _b = obj.datos; _a < _b.length; _a++) {
                        var d = _b[_a];
                        //Busco los indices no creados para darles función
                        if (nameIndices.indexOf(d.indice) === -1) {
                            store.createIndex(d.indice, d.indice, { unique: d.unico });
                        }
                    }
                }
                else {
                    //Como fue la primera vez que se creo entonces vamos a crear todos los indices
                    for (var _c = 0, _d = obj.datos; _c < _d.length; _c++) {
                        var d = _d[_c];
                        store.createIndex(d.indice, d.indice, { unique: d.unico });
                    }
                }
            }
        };
        //En caso tal de no haber modificaciones
        abrir.onsuccess = function () {
            db = abrir.result;
        };
    }
    LibDB.prototype.abrir = function () {
        //Clase que se ejecutara en todos los metodos que actuan directamente sobre la base de datos
        return new Promise(function (resolve, reject) {
            var trae = localStorage.getItem("dbItems"), datosDBS = JSON.parse(trae), abrir = indexedDB.open(datosDBS.name, parseInt(datosDBS.version));
            abrir.onsuccess = function () {
                db = abrir.result;
                resolve("completado");
            };
        });
    };
    LibDB.prototype.crearKey = function () {
        //Metodo que genera los key cuando se ingresan datos a las colleciones
        return (Date.parse("" + new Date()).toString(36) +
            Math.random()
                .toString(36)
                .substr(2, 9));
    };
    LibDB.prototype.filtrarIndice = function (informacionObtenida, infoFiltro, dats) {
        return new Promise(function (resolve, reject) {
            var resultado;
            if (infoFiltro.length == 2) {
                resultado = informacionObtenida.filter(function (inf) { return inf[infoFiltro[1]] === dats[infoFiltro[1]]; });
                resolve(resultado);
            }
            else if (infoFiltro.length == 3) {
                resultado = informacionObtenida.filter(function (inf) {
                    return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                        inf[infoFiltro[2]] === dats[infoFiltro[2]];
                });
                resolve(resultado);
            }
            else {
                resultado = informacionObtenida.filter(function (inf) {
                    return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                        inf[infoFiltro[2]] === dats[infoFiltro[2]] &&
                        inf[infoFiltro[3]] === dats[infoFiltro[3]];
                });
                resolve(resultado);
            }
        });
    };
    //Busqueda simple, nos premite realizar consultas simples, de un solo objeto
    LibDB.prototype.get = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readonly"), almacen = transaccion.objectStore(nameCol);
                if (dats.key) {
                    var busqueda = almacen.get(dats.key);
                    busqueda.onsuccess = function (e) {
                        db.close();
                        resolve(e.target.result);
                    };
                }
                else {
                    var infoFiltro_1 = [];
                    for (var a in dats) {
                        infoFiltro_1.push(a);
                    }
                    var indice = almacen.index(infoFiltro_1[0]), informacionObtenida_1 = [];
                    if (infoFiltro_1.length == 1) {
                        var busqueda = indice.get(dats[infoFiltro_1[0]]);
                        busqueda.onsuccess = function (e) {
                            db.close();
                            resolve(e.target.result);
                        };
                    }
                    else {
                        var busqueda = indice.openCursor(dats[infoFiltro_1[0]]);
                        busqueda.onsuccess = function (e) {
                            var data = e.target.result;
                            if (data) {
                                informacionObtenida_1.push(data.value);
                                data["continue"]();
                            }
                            else {
                                _this.filtrarIndice(informacionObtenida_1, infoFiltro_1, dats).then(function (resultado) {
                                    db.close();
                                    resolve([resultado[0]]);
                                });
                            }
                        };
                    }
                }
            });
        });
    };
    LibDB.prototype.getAll = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readonly"), almacen = transaccion.objectStore(nameCol);
                if (dats) {
                    var infoFiltro_2 = [];
                    for (var a in dats) {
                        infoFiltro_2.push(a);
                    }
                    var indice = almacen.index(infoFiltro_2[0]), informacionObtenida_2 = [];
                    if (infoFiltro_2.length == 1) {
                        var busqueda = indice.openCursor(dats[infoFiltro_2[0]]);
                        busqueda.onsuccess = function (e) {
                            var resData = e.target.result;
                            if (resData) {
                                informacionObtenida_2.push(resData.value);
                                resData["continue"]();
                            }
                            else {
                                db.close();
                                resolve(informacionObtenida_2);
                            }
                        };
                    }
                    else {
                        var busqueda = indice.openCursor(dats[infoFiltro_2[0]]);
                        busqueda.onsuccess = function (e) {
                            var data = e.target.result;
                            if (data) {
                                informacionObtenida_2.push(data.value);
                                data["continue"]();
                            }
                            else {
                                _this.filtrarIndice(informacionObtenida_2, infoFiltro_2, dats).then(function (resultado) {
                                    db.close();
                                    resolve(resultado);
                                });
                            }
                        };
                    }
                }
                else {
                    var busqueda = almacen.getAll();
                    busqueda.onsuccess = function (e) {
                        db.close();
                        resolve(e.target.result);
                    };
                }
            });
        });
    };
    LibDB.prototype.put = function (nameCol, dats, modificar) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol);
                if (dats.key) {
                    //Modificar Por key
                    var busqueda = almacen.get(dats.key);
                    //Rescato el dato a modificar
                    busqueda.onsuccess = function (e) {
                        //Verifico si tiene la palabra clave $unds
                        //Esa palabra clave nos premite solo modificar los datos incluidos ahí, de lo contrario modifica todo
                        var resp = e.target.result;
                        if (modificar.$unds) {
                            for (var m in modificar.$unds) {
                                resp[m] = modificar.$unds[m];
                            }
                            var modificado = almacen.put(resp);
                            modificado.onsuccess = function () {
                                db.close();
                                resolve("Completado");
                            };
                        }
                        else {
                            var update = modificar;
                            update.key = resp.key;
                            var modificado = almacen.put(update);
                            modificado.onsuccess = function () {
                                db.close();
                                resolve("Completado");
                            };
                        }
                    };
                }
                else {
                    //Modificar por indice
                    var infoFiltro_3 = [], informacionObtenida_3 = [];
                    for (var a in dats) {
                        infoFiltro_3.push(a);
                    }
                    var indice = almacen.index(infoFiltro_3[0]), 
                    busqueda = indice.openCursor(dats[infoFiltro_3[0]]);
                    busqueda.onsuccess = function (e) {
                        var data = e.target.result;
                        if (data) {
                            informacionObtenida_3.push(data.value);
                            data["continue"]();
                        }
                        else {
                            _this.filtrarIndice(informacionObtenida_3, infoFiltro_3, dats).then(function (resultado) {
                                var resp = resultado[0];
                                if (modificar.$unds) {
                                    for (var m in modificar.$unds) {
                                        resp[m] = modificar.$unds[m];
                                    }
                                    var modificado = almacen.put(resp);
                                    modificado.onsuccess = function () {
                                        db.close();
                                        resolve("Completado");
                                    };
                                }
                                else {
                                    var update = modificar;
                                    update.key = resp.key;
                                    var modificado = almacen.put(update);
                                    modificado.onsuccess = function () {
                                        db.close();
                                        resolve("Completado");
                                    };
                                }
                            });
                        }
                    };
                }
            });
        });
    };
    LibDB.prototype.putAll = function (nameCol, dats, modificar) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol), infoFiltro = [], informacionObtenida = [];
                for (var m in dats) {
                    infoFiltro.push(m);
                }
                var indice = almacen.index(infoFiltro[0]), busqueda = indice.openCursor(dats[infoFiltro[0]]);
                busqueda.onsuccess = function (e) {
                    var result = e.target.result;
                    if (result) {
                        informacionObtenida.push(result.value);
                        result["continue"]();
                    }
                    else {
                        var resultado;
                        if (infoFiltro.length == 2) {
                            resultado = informacionObtenida.filter(function (inf) { return inf[infoFiltro[1]] === dats[infoFiltro[1]]; });
                        }
                        else if (infoFiltro.length == 3) {
                            resultado = informacionObtenida.filter(function (inf) {
                                return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                                    inf[infoFiltro[2]] === dats[infoFiltro[2]];
                            });
                        }
                        else {
                            resultado = informacionObtenida.filter(function (inf) {
                                return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                                    inf[infoFiltro[2]] === dats[infoFiltro[2]] &&
                                    inf[infoFiltro[3]] === dats[infoFiltro[3]];
                            });
                        }
                        for (var _i = 0, resultado_1 = resultado; _i < resultado_1.length; _i++) {
                            var resp = resultado_1[_i];
                            if (modificar.$unds) {
                                for (var m in modificar.$unds) {
                                    resp[m] = modificar.$unds[m];
                                }
                                var modificado = almacen.put(resp);
                                modificado.onsuccess = function () { };
                            }
                            else {
                                var update = modificar;
                                update.key = resp.key;
                                var modificado = almacen.put(update);
                                modificado.onsuccess = function () { };
                            }
                            db.close();
                            resolve("Modificados");
                        }
                    }
                };
            });
        });
    };
    LibDB.prototype.post = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                dats.key = _this.crearKey();
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol), guardar = almacen.add(dats);
                guardar.onsuccess = function () {
                    db.close();
                    resolve(dats.key);
                };
                guardar.onerror=function(err){
                    reject(err)
                }
            });
        });
    };
    LibDB.prototype.postAll = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol);
                for (var i = 0; i < dats.length; i++) {
                    dats[i].key = _this.crearKey();
                    var guardar = almacen.add(dats[i]);
                    guardar.onerror = function () {
                        reject("fallo");
                    };
                    if (i === dats.length - 1) {
                        db.close();
                        resolve("completado");
                    }
                }
            });
        });
    };
    LibDB.prototype["delete"] = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol);
                if (dats.key) {
                    var borrado = almacen["delete"](dats.key);
                    borrado.onsuccess = function () {
                        resolve("Eliminado");
                    };
                }
                else {
                    var infoFiltro_4 = [], informacionObtenida_4 = [];
                    for (var a in dats) {
                        infoFiltro_4.push(a);
                    }
                    var indice = almacen.index(infoFiltro_4[0]), busqueda = indice.openCursor(dats[infoFiltro_4[0]]);
                    busqueda.onsuccess = function (e) {
                        var result = e.target.result;
                        if (result) {
                            informacionObtenida_4.push(result.value);
                            result["continue"]();
                        }
                        else {
                            var resultado;
                            if (infoFiltro_4.length == 2) {
                                resultado = informacionObtenida_4.filter(function (inf) { return inf[infoFiltro_4[1]] === dats[infoFiltro_4[1]]; });
                            }
                            else if (infoFiltro_4.length == 3) {
                                resultado = informacionObtenida_4.filter(function (inf) {
                                    return inf[infoFiltro_4[1]] === dats[infoFiltro_4[1]] &&
                                        inf[infoFiltro_4[2]] === dats[infoFiltro_4[2]];
                                });
                            }
                            else if (infoFiltro_4.length == 4) {
                                resultado = informacionObtenida_4.filter(function (inf) {
                                    return inf[infoFiltro_4[1]] === dats[infoFiltro_4[1]] &&
                                        inf[infoFiltro_4[2]] === dats[infoFiltro_4[2]] &&
                                        inf[infoFiltro_4[3]] === dats[infoFiltro_4[3]];
                                });
                            }
                            else {
                                resultado = informacionObtenida_4;
                            }
                            var borrar = almacen["delete"](resultado[0].key);
                            borrar.onsuccess = function () {
                                db.close();
                                resolve("Eliminado");
                            };
                        }
                    };
                }
            });
        });
    };
    LibDB.prototype.deleteAll = function (nameCol, dats) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.abrir().then(function () {
                var transaccion = db.transaction(nameCol, "readwrite"), almacen = transaccion.objectStore(nameCol), infoFiltro = [], informacionObtenida = [];
                for (var a in dats) {
                    infoFiltro.push(a);
                }
                var indice = almacen.index(infoFiltro[0]), busqueda = indice.openCursor(dats[infoFiltro[0]]);
                busqueda.onsuccess = function (e) {
                    var result = e.target.result;
                    if (result) {
                        informacionObtenida.push(result.value);
                        result["continue"]();
                    }
                    else {
                        var resultado;
                        if (infoFiltro.length == 2) {
                            resultado = informacionObtenida.filter(function (inf) { return inf[infoFiltro[1]] === dats[infoFiltro[1]]; });
                        }
                        else if (infoFiltro.length == 3) {
                            resultado = informacionObtenida.filter(function (inf) {
                                return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                                    inf[infoFiltro[2]] === dats[infoFiltro[2]];
                            });
                        }
                        else if (infoFiltro.length == 4) {
                            resultado = informacionObtenida.filter(function (inf) {
                                return inf[infoFiltro[1]] === dats[infoFiltro[1]] &&
                                    inf[infoFiltro[2]] === dats[infoFiltro[2]] &&
                                    inf[infoFiltro[3]] === dats[infoFiltro[3]];
                            });
                        }
                        else {
                            resultado = informacionObtenida;
                        }
                        for (var _i = 0, resultado_2 = resultado; _i < resultado_2.length; _i++) {
                            var res = resultado_2[_i];
                            var borrar = almacen["delete"](res.key);
                            borrar.onsuccess = function () { };
                        }
                        resolve("Eliminados");
                    }
                };
            });
        });
    };
    LibDB.prototype.eliminarContent = function (nombreCollections) {
        return new Promise(function (resolve, reject) {
            var transaction = db.transaction(nombreCollections), almacen = transaction.objectStore(nombreCollections), resultado = almacen.clear();
            resultado.onsuccess = function () {
                resolve("Eliminado");
            };
        });
    };
    return LibDB;
}());