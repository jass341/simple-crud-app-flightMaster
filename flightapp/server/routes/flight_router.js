const express = require('express');

const flightCtrl = require('../controllers/flight_controller');

const router = express.Router();

router.post('/flight', flightCtrl.createFlight);

router.put('/flight/:id', flightCtrl.updateFlight);

router.get('/flights', flightCtrl.getFlights);
router.get('/flight/destination/:destination', flightCtrl.getFlightByDestination);
router.get('/flight/date/:date', flightCtrl.getFlightByDate);
router.get('/flight/:id', flightCtrl.getFlightByID);

module.exports = router;