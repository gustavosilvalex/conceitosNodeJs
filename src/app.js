const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


// Rotas ______________________________________________________________________


// Listagem________________________________________
app.get("/repositories", (request,response) => {
  return response.json(repositories);
});
//_________________________________________________

// Criação ________________________________________
app.post("/repositories", (request, response) => {
  const { title , url , techs } =  request.body;
  const repository = {
    id: uuid(),
    title, 
    url,
    techs, 
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});
//_________________________________________________



// Atualizar____________________________________________
app.put("/repositories/:id", (request, response) => {
  const { title,  url ,techs}  = request.body ;
  const {id} = request.params;
  const findRepositoryIndex = repositories.findIndex( repository => repository.id === id);




  if(findRepositoryIndex === -1){
    return response.status(400).json({error: 'repositorie does not exists'});
  }

  const repository ={
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex]= repository;

  return response.json(repository);

});
//______________________________________________________



// Deletar _______________________________________________
app.delete("/repositories/:id", (request, response) => {
    const { id } =  request.params;
    const findRepositoryIndex = repositories.findIndex( repository => repository.id === id);

    if (findRepositoryIndex >= 0 ){
      repositories.splice(findRepositoryIndex, 1);
    } else {
      return response.status(400).json({error:"repository not exists"});
    }

    return response.status(204).send();
});
//_________________________________________________________



// Trocar_______________________________________________________
app.post("/repositories/:id/like", (request, response) => {
   const {id} = request.params;

   const findRepositoryIndex = repositories.findIndex( repository => repository.id === id);
   if(findRepositoryIndex === -1){
    return response.status(400).json({error: 'repositorie does not exists'});
  }
  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);

});
//________________________________________________________________


module.exports = app;
