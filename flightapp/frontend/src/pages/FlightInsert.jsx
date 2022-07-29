import React, { Component } from "react";
import api from '../api'

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputGroup from 'react-bootstrap/InputGroup';
import moment from "moment";
import styled from 'styled-components'


const ParentWrapper = styled.div`
padding: 0 40px 40px 40px;
margin : 30px auto;
width:80%;
color : var(--navBg);

`

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 auto;
    padding : 15px;
    width:60%;
    
    border-radius : 10px;
    box-shadow : 1px 1px 20px 1px var(--navBg);

`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
const InputTextDate = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    padding : 5px;
    display : none;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const datePickerStyle = `
display: block;
width: 100em;
padding: .375rem .75rem;

`

class FlightInsert extends Component {
    
    constructor(props){
        super(props);
       
        this.state = {
            flight_number : '',
            flight_duration : '',
            source : '',
            destination : '',
            departure_time : '',
            value : new Date()
        }
    }

    handleChangeInputFlightNumber = async event =>{
        const flight_number = event.target.value;
        this.setState({flight_number : flight_number});
    }

    handleChangeInputFlightDuration = async event =>{
        const flight_duration = event.target.value;
        this.setState({flight_duration : flight_duration});
    }

    handleChangeInputsource = async event =>{
        const source = event.target.value;
        this.setState({source : source});
    }

    handleChangeInputdestination = async event =>{
        const destination = event.target.value;
        this.setState({destination : destination});
    }

    handleChangeInputDeparture = async event =>{
        const departure_time = event.target.value;

        this.setState({departure_time : moment(departure_time).format()});
    }

    handleIncludeMovie = async () => {
        const { flight_number, flight_duration, source, destination, departure_time} = this.state;
        const flight = {flight_number, flight_duration, source, destination, departure_time};

        await api.insertFlight(flight).then(res => {
            window.alert(`Flight inserted successfully`);
            this.setState({
                flight_number : '',
                flight_duration : '',
                source : '',
                destination : '',
                departure_time : ''
            });
        });
         
    }

    render(){
        const {flight_number, flight_duration, source, destination, departure_time, value} = this.state;
        return (
            <ParentWrapper>
           <Wrapper>
            <Title>
                Create Flight
            </Title>
            <Label>Flight Number :</Label>
            <InputText type = "text" value={flight_number} onChange={this.handleChangeInputFlightNumber}/>
            <Label>Duration :</Label>
            <InputText type = "number" value={flight_duration} onChange={this.handleChangeInputFlightDuration} min="0" />
            <Label>Source :</Label>
            <InputText type = "text" value={source} onChange={this.handleChangeInputsource} />

            <Label>Destination :</Label>
            <InputText type = "text" value={destination} onChange={this.handleChangeInputdestination} />
            <Label>Departure :</Label>
            
            <InputGroup className="mb-3">
            <InputTextDate type = "text" value={departure_time} onChange={this.handleChangeInputDeparture} />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} style = {{width :"100em", background : "white"}}/>}
        value={value}
        onChange={(newValue) => {
          this.setState({value : newValue, departure_time : moment(newValue).format()});
        }}
        
      />
    </LocalizationProvider>
      </InputGroup>
           
            <Button onClick={this.handleIncludeMovie}>Add Flight</Button>
            <CancelButton href={'/flight/list'}>Cancel</CancelButton>
            
           </Wrapper>
           </ParentWrapper>
        )
    }
}

export default FlightInsert;