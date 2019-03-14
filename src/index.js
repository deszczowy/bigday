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
            items: [
                {id: 1, description: 'white dress', price: 200},
                {id: 2, description: 'restaurant', price: 15000},
                {id: 3, description: 'flowers', price: 50},
            ],
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

    render(){
        return (
        <Tabs className="pages">
            <TabList className="tabs"> 
                <Tab className="tab">Guest list</Tab>
                <Tab className="tab">Budget</Tab>
            </TabList>

            <TabPanel className="panel">
                <GuestList />
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