import React from 'react'

import {Tab, Row, Col, Nav, Image} from 'react-bootstrap'

import BudgetForm from './BudgetForm.js'
import BudgetSheet from './BudgetSheet.js'

import GuestForm from './GuestForm.js'
import GuestList from './GuestList.js'

import FileInput from './FileInput.js'

import BigDayLogo from '../media/bigday.png'

export default class App extends React.Component{
    constructor(){
        super();

        this.state = {
            guests: [],
            items: [],
        }
    }

    // () => this.handleClick(i)
    updateBudgetItems = (itemName, itemPrice) => {
        var newId = this.state.items.length +1;
        if (itemName){
            const updatedItems = [...this.state.items, {id: newId, description: itemName, price: itemPrice}];
    
            this.setState(
                {items: updatedItems}
            );
        }

    }

    updateGuestsList = (guestName, guestSide) => {
        if (guestName){
            const updatedGuests = [...this.state.guests, {name: guestName, side: guestSide}];

            this.setState(
                {guests: updatedGuests}
            );
        }
    }

    printGuestList = () => {
        var hers = [];
        var his = [];

        var i = 0;
        for (i = 0; i < this.state.guests.length; i++){
            if (this.state.guests[i].side === 0) {
                hers.push(this.state.guests[i].name);
            } else {
                his.push(this.state.guests[i].name);
            }
        }

        var createPdf = require('pdfmake-browserified');
        var dd = { 
            content: [
                'Guests of Her side:',
                {
                    ol: hers
                },
                'Guests of His side:',
                {
                    ol: his
                }
            ]
        };
        createPdf(dd).open();
    }

    render(){
        return (
            <Tab.Container defaultActiveKey="gl">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Image src={BigDayLogo} fluid/>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="gl">Guest List</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="bg">Budget</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="up">Upload</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3}>
                    <Tab.Content>
                        <Tab.Pane eventKey="gl">
                            <GuestForm updateList={this.updateGuestsList} />
                            <button onClick={this.printGuestList}>Print</button>
                        </Tab.Pane>
                        <Tab.Pane eventKey="bg">
                            <BudgetForm updateBudget={this.updateBudgetItems}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
                <Col sm={6}>
                    <Tab.Content>
                        <Tab.Pane eventKey="gl">
                            <GuestList list={this.state.guests} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="bg">
                            <BudgetSheet entries={this.state.items} updateBudget={this.updateBudgetItems}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="up">
                            <FileInput />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        );
    } 
}
