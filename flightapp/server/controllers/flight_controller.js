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
deleteFlight = async (req, res) => {
    (await Flight.findOneAndDelete({flight_number : req.params.id}, (err, flight) => {
         if(err){
             return res.status(400).json({
                 success : false,
                 message : 'Not deleted',
                 error : err
             });
         }
 
         if(!flight){
             return res.status(404).json({message : 'Flight not found', success : false});
         }
 
         return res.status(200).json({message : 'Flight Deleted', success : true});
     }).catch(err => console.error(err)));
 }
 
 getFlightByID = async (req, res) => {
     await Flight.findOne({_id : req.params.id}, (err, flight) => {
         if(err){
             return res.status(400).json({error : err, success :false});
         }
         if(!flight){
             return res.status(404).json({message : 'Flight Not found', success : false})
         }
         return res.status(200).json({success : true, data : flight});
     }).clone().catch(err => console.error(err));
 }
 
 getFlightByDestination = async (req, res) => {
     console.log('hi des');
     await Flight.find({destination : req.params.destination}, (err, flights) => {
         
         if(err){
             console.log(err);
             return res.status(400).json({error : err, success :false});
         }
         if(!flights.length){
             console.log('err');
             return res.status(404).json({message : 'Flight Not found', success : false})
         }
         return res.status(200).json({success : true, data : flights});
     }).clone().catch(err => console.error(err));
 }

 getFlightByDate = async (req, res) => {
    console.log('hi date');
    const startDate = new Date(req.params.date);
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 1);
    await Flight.find({departure_time :{$gte : startDate, $lt : endDate} }, (err, flights) => {
        
        if(err){
            console.log(err);
            return res.status(400).json({error : err, success :false});
        }
        if(!flights.length){
            console.log('err');
            return res.status(404).json({message : 'Flight Not found', success : false})
        }
        return res.status(200).json({success : true, data : flights});
    }).clone().catch(err => console.error(err));
}
 
 getFlights = async (req, res) => {
     await Flight.find({},(err, flights) => {
         console.log('getflights');
         if(err){
             return res.status(400).json({error : err, success :false});
         }
         if(!flights.length){
             return res.status(404).json({success : false, message : 'No Data Found'});
         }
 
         return res.status(200).json({success : true, data : flights});
 
     }).clone().catch(err => console.error(err));
 }
 
 module.exports = {
     createFlight,
     updateFlight,
     deleteFlight,
     getFlightByID,
     getFlightByDestination,
     getFlights,
     getFlightByDate
 }