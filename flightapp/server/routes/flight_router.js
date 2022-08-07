const express = require('express');

const flightCtrl = require('../controllers/flight_controller');

const router = express.Router();

router.post('/flight', flightCtrl.createFlight);

router.put('/flight/:id', flightCtrl.updateFlight);

router.get('/flights', flightCtrl.getFlights);
router.get('/flight/destination/:destination', flightCtrl.getFlightByDestination);
router.get('/flight/number/:flight_number', flightCtrl.getFlightByNumber);
router.get('/flight/date/:date', flightCtrl.getFlightByDate);
router.get('/flight/:id', flightCtrl.getFlightByID);

router.delete('/flight/:id', flightCtrl.deleteFlight);

module.exports = router;