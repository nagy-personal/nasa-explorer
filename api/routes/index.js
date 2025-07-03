const express = require('express');
const router = express.Router();

const apodController = require('../controllers/apodController');
const marsRoverController = require('../controllers/marsRoverController');
const neoController = require('../controllers/neoController');
const epicController = require('../controllers/epicController');
const healthController = require('../controllers/healthController');

router.get('/apod', apodController.getAPOD);
router.get('/mars-rover/:rover', marsRoverController.getMarsRoverPhotos);
router.get('/mars-rovers', marsRoverController.getMarsRovers);
router.get('/neo', neoController.getNEO);
router.get('/epic', epicController.getEPIC);
router.get('/health', healthController.healthCheck);

module.exports = router; 