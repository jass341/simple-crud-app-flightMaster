import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import styled from 'styled-components'

import './react-table.css'


const ParentWrapper = styled.div`
padding: 0 40px 40px 40px;
margin : 30px auto;
width:90%;
color : var(--navBg);
margin-top : 30px;

`

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    width : 100%;
    box-shadow : 1px 1px 20px 1px var(--navBg);
    border-radius : 10px;
    padding-top : 15px;

`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class DeleteFlight extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the flight ${this.props.id} permanently?`,
            )
        ) {
            api.deleteFlightByID(this.props.id)
            window.location.reload()
        }
    }

    render() {
        
        return <Button variant="outline-light" onClick={this.deleteUser}> Delete </Button>
        //return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
class FlightList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            columns: [],
            isLoading: false,
            destination : '',
            date : '',
            value : new Date()
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllFlights().then(flights => {
            this.setState({
                flights: flights.data.data,
                isLoading: false,
            })
        })
    }
    handleChangeInputdestination = async event =>{
        const destination = event.target.value;
        this.setState({destination : destination});
    }

    handleChangeInputDate = async event =>{
        const departure_time = event.target.value;

        this.setState({date : moment(departure_time).format("yyyy-MM-DD")});
    }

    handleDestinationSearch = async () => {
        this.setState({ isLoading: true })
        const destination = this.state.destination;
        await api.getFlightByDestination(destination).then(flights => {
            this.setState({
                flights : flights.data.data,
                isLoading : false
            })
        })
    }
    handleDateSearch = async () => {
        this.setState({ isLoading: true })
        const date = this.state.date;
        await api.getFlightByDate(date).then(flights => {
            this.setState({
                flights : flights.data.data,
                isLoading : false
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                flights : [],
                isLoading : false
            })
            window.alert('There are no flights for the specified date.\nKindly search with a different date')
        });
    }

    render() {
        const { flights, isLoading, destination, date, value } = this.state
        console.log('TCL: FlightList -> render -> movies', flights)

        const columns = [
            {
                Header: 'Flight #',
                accessor: 'flight_number',
                filterable: true,

            },
            {
                Header: 'Duration',
                accessor: 'flight_duration',
                filterable: true,
            },
            {
                Header: 'Source',
                accessor: 'source',
                filterable: true,
            },
            {
                Header: 'Destination',
                accessor: 'destination',
                filterable: true,
                
            },
            {
                Header: 'Departure',
                accessor: 'departure_time',
                Cell: props => <span>{moment(props.value.toString()).format("MMMM Do YYYY, h:mm:ss a")}</span>
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteFlight id={props.original.flight_number} />
                        </span>
                    )
                },
            }
        ]

        let showTable = true
        if (!flights.length) {
            showTable = false
        }

        return (
           
            <>
            
           
            <ParentWrapper>
            <Wrapper>
            <Container style={{marginTop : "30px", width : "70%"}}>
      <Form>
      <Form.Label>Destination</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Destination"
          aria-label="Destination"
          aria-describedby="basic-addon2"
          value={destination}
          onChange={this.handleChangeInputdestination}
        />
        <Button variant="primary" id="button-addon2" onClick={this.handleDestinationSearch} style={{background: "var(--navBg)"}}>
          Search
        </Button>
      </InputGroup>
      <Form.Label>Date</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Date"
          aria-label="Date"
          aria-describedby="basic-addon2"
          value = {date}
          onChange = {this.handleChangeInputDate}
          style= {{display : 'none'}}
        />
       <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props} style = {{width :"46em", background : "white", border : '0px solid '}}/>}
        value={value}
        label = {'-'}
        onChange={(newValue) => {
          this.setState({value : newValue, date : moment(newValue).format("yyyy-MM-DD")});
        }}
        
        
      />
    </LocalizationProvider>
        <Button variant="primary" id="button-addon2" style={{background: "var(--navBg)"}} onClick={this.handleDateSearch}>
          Search
        </Button>
      </InputGroup>
     
      </Form>
    </Container>
           
                {showTable && (
                    <ReactTable 
                        data={flights}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
            </ParentWrapper>
            </>
        )
    }
}

export default FlightList