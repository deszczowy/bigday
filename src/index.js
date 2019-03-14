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
        <Tabs className="pages">
        
            <TabList className="tabs"> 
                <Tab className="tab">Guest list</Tab>
                <Tab className="tab">Budget</Tab>
                <Tab className="tab">Upload</Tab>
            </TabList>

            <TabPanel className="panel">
                <GuestList list={this.state.guests} updateList={this.updateGuestsList}/>
                <button onClick={this.printGuestList}>Print</button>
            </TabPanel>
            <TabPanel className="panel">
                <Budget entries={this.state.items} updateBudget={this.updateBudgetItems}/>
            </TabPanel>
            <TabPanel className="panel">
                <FileInput/>
            </TabPanel>
        </Tabs>
        );
    } 
}



class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();

      this.state = {
          content: ""
      };
    }

    loadFile = (e) => {

        this.setState(
            {content: e.target.result}
        );
    }

    handleSubmit(event) {
      event.preventDefault();

      var file = this.fileInput.current.files[0];

      var reader = new FileReader();
      reader.onload = this.loadFile;
      reader.readAsText(file);
    }
  
    render() {
        const {content} = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />{content}
          <button type="submit">Submit</button>
        </form>
      );
    }
  }



ReactDOM.render(
    <BigDay />, 
    document.getElementById('root')
)