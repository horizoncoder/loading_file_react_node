const { Router } = require('express');
const clientController = require("../controlers/clients/clients.controllers");

const router = Router();


router.post('/upload/clients', clientController.getClientsFromCSV)

router.post('/message/client', clientController.sendMessageToClient)
module.exports = router;
