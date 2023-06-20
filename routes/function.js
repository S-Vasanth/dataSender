const express = require("express");

const router = express.Router();

/////////////////////// CONTROLLER AND ROUTE FOR CREATE //////////////
const createController = require("./../controller/create");

router.post('/accounts',createController.account)

router.post('/destinations',createController.destination)


/////////////////////// CONTROLLER AND ROUTE FOR CREATE //////////////
const updateController = require("./../controller/update");

router.put('/updateaccounts',updateController.accountUpdate)

router.put('/updatedestination',updateController.destinationUpdate)


/////////////////////// CONTROLLER AND ROUTE FOR DELETE //////////////

const deleteController = require("./../controller/delete");

router.delete('/accounts/delete',deleteController.deleteAccDest)


/////////////////////// CONTROLLER AND ROUTE FOR VIEW //////////////

const viewController = require("./../controller/view");

router.get('/viewaccounts',viewController.viewAcc)

router.get('/viewdestination',viewController.viewDest)


/////////////////////// CONTROLLER AND ROUTE FOR SEND A DATA TO DESTINATION //////////////

const sendDataToDestController = require("./../controller/sendDataToDest");

router.post('/server/incoming_data',sendDataToDestController.SendToDest)



module.exports = router;