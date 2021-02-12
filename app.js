const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json())

//models
require("./src/models/Usuario");
const Usuario = mongoose.model('usuarios');

//conexao db uma_store
 require('./src/db/connect');

 

app.get('/usuarios', async (req,res) => {
    const usuariosResponse = await Usuario.find();
    const usuariosJson = await usuariosResponse;

    return res.json(usuariosJson);
});

app.post("/usuarios", async(req,res) => {
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    });

    novoUsuario.save()

    res.json({message: "Cadastro Uma Store efetuado com sucesso", usuario: novoUsuario})
});

app.put('/usuarios/:nome', async(req,res) =>{
    const { nome } = req.params
    const usuario = await Usuario.findOne({nome: nome})

    usuario.nome = req.body.nome
    usuario.email = req.body.email
    usuario.senha = req.body.senha

    usuario.save()

    res.json({message: "Alteração de dados do usuário feita com sucesso", usuario:usuario})
});

app.delete("/usuarios/:nome", async (req,res) => {
    const {nome} = req.params;
    const usuario = await Usuario.findOneAndDelete({nome:nome});
    res.json({message:"Usuario deletado com sucesso", usuario:usuario})
})

app.listen(3333);