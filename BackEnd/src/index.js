const express = require('express');
const mongoose = require('mongoose');
const coors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://camargo:Gremio1903@cluster0-ksket.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(coors());
app.use(express.json()); //Permite ao express entender body do tipo Json
app.use(routes);
app.listen(3333);


//MÉTODOS HTTP: GET, POST, PUT, DELETE

/*TIPOS DE PARÂMETROS:
* QUERY PARAMS: Parâmetros utilizados para querys (filtros, ordenação, paginação, ...). Acesso: request.query
* ROUTE PARAMS: Parâmetros de rotas, fixo na Url sem nome (Identificar um recurso para remoção ou edição). Acesso: request.params
* BODY: Parâmetros de corpo, informação JSON (Parâmetro para realizar inserção de informação). Acesso: request.body
*/

//MONGO-DB - Banco de dados não relacional




