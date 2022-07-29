import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3000/api'
});

export const insertFlight = flight => api.post(`/flight`, flight);

export const getAllFlights = () => api.get(`/flights`);
export const getFlightByID = id => api.get(`/flight/${id}`);
export const getFlightByDestination = destination => api.get(`/flight/destination/${destination}`);
export const getFlightByDate = date => api.get(`/flight/date/${date}`);

export const updateFlightByID = (id, flight) => api.put(`/flight/${id}`, flight);

export const deleteFlightByID = id => api.delete(`/flight/${id}`);

const apis = {
    insertFlight,
    getAllFlights, getFlightByDate, getFlightByDestination, getFlightByID,
    updateFlightByID,
    deleteFlightByID
}

export default apis;