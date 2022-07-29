import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES

import {FlightInsert, FlightList} from '../pages'

export default function App() {
  return (
    <div className="App" style={{}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<FlightList />} />
          <Route path="/flight/create" element={<FlightInsert />} />
          <Route path="/reports" element={<FlightInsert />} />
        </Routes>
      </Router>
    </div>
  );
}
