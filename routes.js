let express = require('express');
let router = express.Router();

let userController = require('./controllers/userController');

// Liste des routes vers les controleurs
//router.get("/", (request, response) => response.redirect('/user'));         // fait une redirection de la racine "/" vers la page des users "/user"

router.get("/", userController.userFormations);
router.get("/user/connection", userController.userConnection);
router.post("/user/new", userController.userNew);
router.get("/user/bag", userController.userBag);
router.get("/user/inscription/:idFormation", userController.userInscription);
router.get("/login/:user", userController.userLoginIntoSession);
router.get("/test", userController.showUserSession);

module.exports = router;