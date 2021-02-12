const mongoose = require("mongoose");

function connect () {
    mongoose
    .connect("mongodb://localhost/uma_store", {
        useNewUrlParser: true, useUnifiedTopology: true
    })
        .then(() => {
            console.log("Conectado com o banco uma_store")
        }).catch((error) => {
            console.log(`Erro ao tentar conectar ${error}`);
        });
}

module.exports = connect()