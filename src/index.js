import React from 'react';
import ReactDOM from 'react-dom';

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import 'react-tabs/style/react-tabs.css'
import './primitive.css'
import './index.css';

import Budget from './budget.js'
import GuestList from './guests.js'


/* pdf - pdfmake - http://pdfmake.org - npm install pdfmake 
*/

class BigDay extends React.Component{
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

    render(){
        return (
        <Tabs className="pages">
        
            <TabList className="tabs"> 
                <Tab className="tab">Guest list</Tab>
                <Tab className="tab">Budget</Tab>
            </TabList>

            <TabPanel className="panel">
                <GuestList list={this.state.guests} updateList={this.updateGuestsList}/>
            </TabPanel>
            <TabPanel className="panel">
                <Budget entries={this.state.items} updateBudget={this.updateBudgetItems}/>
            </TabPanel>
        </Tabs>
        );
    } 
}







ReactDOM.render(
    <BigDay />, 
    document.getElementById('root')
)