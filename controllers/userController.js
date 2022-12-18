const User = require('../models/userModel');
let user = require('../models/userModel');

const router = require('../routes');

// Data base connection
var mysql = require("mysql");

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'formations'
});
connection.connect(function(error){if (error) console.log(error);})     // si erreur de type : ER_NOT_SUPPORTED_AUTH_MODE       // mettre ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root'; dans mysql workbench et executer


exports.userFormations = function(request, response){
    connection.query("select * from formation;", function(error, result){
        if (error) console(error);
        response.render("userFormations.ejs", {formations: result});
    });
};

// Affichage de la page pour insérer un pseudo
exports.userConnection = function(request, response){
    response.render("userConnection.ejs", {pseudo : ''});
};

// Enregistrement du pseudo dans la session
exports.userNew = function(request, response) {
    request.session.user = request.body.pseudo;                 //? Inscrit dans la session le user
    console.log(request.session);
    connection.query("select * from formation;", function(error, result){
        if (error) console(error);
        response.render("userFormations.ejs", {formations: result});
    });
};

// Affichage de le panier
exports.userBag = function(request, response){
    let userPseudo = request.session.user;                          // récupère le user dans la session et le met dans la variable pseudo popur l'utiliser dans userBag.ejs
    let userFormations = request.session.userFormations;            // Autre façon de faire : response.locals.userFormations = request.session.userFormations;
    connection.query("select * from formation;", function(error, result){
        if (error) console(error);
        response.render("userBag.ejs", {formations: result, userFormations : userFormations, userPseudo : userPseudo});
        //response.send("Bienvenue " +  request.session.user);
    });
};

let idFormationList = [];

// Inscription à un cours
exports.userInscription = function(request, response){
    // récupérer l'id de la formation sélectionnée
    let idFormation = request.params.idFormation;
    // Ajoute à la liste des formations sélectionnées
    idFormationList.push(idFormation);
    // insérer la liste des formations dans la session sous le nom de idFormation
    request.session.userFormations = idFormationList;      
    console.log("Ma liste de formations depuis la console " +request.session.userFormations + " et son type "+ typeof(request.session.userFormations))   ;           
    response.send("Bienvenue " +  request.session.user + " l'id de la formation est " + request.session.userFormations);
};



// Test de Login user into session
exports.userLoginIntoSession = function(request, response) {
    request.session.user = request.params.user;                 //? Inscrit dans la session le user
    console.log(request.session);
    response.send("Hello " + request.session.user);
};

// Test de Show user session
exports.showUserSession = function (request, response){
    console.log(request.session);
    response.send("Hello session " + request.session.user);     // récupère dans la session le user
};