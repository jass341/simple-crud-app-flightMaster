const Flight = require('../models/flight_master_model')

createFlight = (req, res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide details of a flight'
        });
    }

    const movie = new Flight(body);

    if(!movie){
        return res.status(400).json({
            success : false,
            error : err,
        });
    }

    movie.save().then(()=>{
        return res.status(201).json({
            success : true,
            id : movie._id,
            message : 'Flight Created'
        });
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message : 'Flight not inserted.'

        });
    });
}

updateFlight = (req, res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({
            success : false,
            message : 'Please provide valid details'
        });
    }

    Flight.findOne({_id : req.params.id}, (err, flight) => {
        if(err){
            return res.status(400).json({
                success : false,
                message : 'Record not found.'
            });
        }

        flight.flight_number = body.flight_number;
        flight.flight_duration = body.flight_duration;
        flight.source = body.source;
        flight.destination = body.destination;
        flight.departure_time = body.departure_time;

        flight
            .save()
            .then(() => {
                return res.status(200).json({
                    success : true,
                    id : flight._id,
                    message : 'Flight Updated.'
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message : 'Movie not updated.'
                });
            });
    });


}

module.exports = {
    createFlight,
    updateFlight
}

