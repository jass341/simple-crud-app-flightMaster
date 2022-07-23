const express = require('express');

const flightCtrl = require('../controllers/flight_controller');

const router = express.Router();

router.post('/flight', flightCtrl.createFlight);

router.put('/flight/:id', flightCtrl.updateFlight);

router.get('/flights', flightCtrl.getFlights);
router.get('/flightx', flightCtrl.getFlights);

module.exports = router;