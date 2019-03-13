import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-table/react-table.css";
import 'react-tabs/style/react-tabs.css'
import './primitive.css'
import './index.css';

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

class Budget extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            newItemName: '',
            newItemPrice: 0.0
        }

        this.renderEditable = this.renderEditable.bind(this);
    }

    changeField = (e) =>{
        //console.log(e.target.dataset.id + '-' + e.target.name + '_' + e.target.className + '. = ' + e.target.value);
        switch (e.target.name){
            case 'newItemName':
                this.setState({newItemName: e.target.value})
                break;
            case 'newItemPrice':
                this.setState({newItemPrice: Number(e.target.value)})
                break;
            default:
                break;
        }
        
    }

    sumUp(items){
        var sum = 0.0;
        for(var i = 0; i < items.length; i++)
        {
            sum += items[i].price;
        }
        return sum;
    }

    addItem = (e) => {
        const {newItemName, newItemPrice} = this.state;
        
        console.log('dddd');
        console.log(newItemName);
        console.log(newItemPrice);
        console.log('eeee');

        if (newItemName){
        
            this.props.updateBudget(newItemName, newItemPrice);
            this.setState(
                {
                    newItemName: '',
                    newItemPrice: 0.0
                }
            );
        }
    }

    renderEditable(cellInfo) {
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const positions = [...this.props.entries];
              
              positions[cellInfo.index][cellInfo.column.id] = isNaN(e.target.innerHTML) ? 0 : parseInt(e.target.innerHTML);

              this.props.updateBudget(positions);
            }}
            dangerouslySetInnerHTML={{
              __html: this.props.entries[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render(){
        const { newItemName, newItemPrice } = this.state;
        const TheadComponent = props => null; // null to hide headers

        var sum = this.sumUp(this.props.entries);
        const items = [{label: 'Sum', amount: sum}];

        console.log(this.props.entries);
        console.log(sum);
        console.log(items);

        return (
            <div className="narrow">
                <div className="addItem">
                    <label>New item:
                    <input type="text" name="newItemName" value={newItemName} onChange={this.changeField}/>
                    </label>
                    <label>Price:
                    <input type="number" name="newItemPrice" value={newItemPrice} onChange={this.changeField}/>
                    </label>
                    <button onClick={this.addItem}>Add</button>
                </div>

                <ReactTable
                data={this.props.entries}
                columns={[
                    {
                    Header: "Element",
                    accessor: "description",
                    },
                    {
                    Header: "Price",
                    accessor: "price",
                    Cell: this.renderEditable
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
                showPagination={false}
                sortable={false}
                minRows={0}
                resizable={false}
                />

                <ReactTable
                data={items}
                TheadComponent={TheadComponent} // hiding headers
                columns={[
                    { 
                        accessor: "label",
                        getProps: (state, rowInfo, column) => {
                            return {
                                style: {
                                    textAlign: 'right'
                                }
                            }
                        },
                    },
                    { accessor: "amount",
                    }
                ]}
                defaultPageSize={1}
                className="-striped -highlight"
                showPagination={false}
                sortable={false}
                minRows={0}
                resizable={false}
                />
            </div>
        );
    }
}


/*
class App extends React.Component{

    render(){
        return (
            <GuestList />
        )
    }
}
*/

class GuestList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            guests: [],
            guestName: "",
            guestSide: 0
        }
    }

    onChange = (e) => {
        console.log(e.target.dataset.id + '-' + e.target.name + '_' + e.target.className + '. = ' + e.target.value);
        this.setState(
            {[e.target.name]: e.target.value}
        )
    }

    onFormSubmit = (e) => {
        const {guestName} = this.state;
        if (guestName) {
            this.setState((prevState) => ({
                guests: [...prevState.guests, {name: prevState.guestName, side: prevState.guestSide}],
                guestSide: 0,
                guestName: ""
            }));
        }
    }

    render(){
        const { guests, guestName, guestSide } = this.state;

        return (
            <div className="narrow">
                <div>
                    <label>Guest Name
                    <input type="text" name="guestName" placeholder="Guest name.." value={guestName} onChange={this.onChange}/>
                    </label>

                    <label>Which side?
                    <select name="guestSide" value={guestSide} onChange={this.onChange}>
                
                    <option value="0">Her</option>
                    <option value="1">His</option>
                    </select>
                    </label>

                    <button onClick={this.onFormSubmit}>Add guest</button>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Side</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            guests.map(
                                (guest, index) => <tr key={index}><td> {guest.name} </td><td> {guest.side === "1" ? 'His' : 'Her'} </td></tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <BigDay />, 
    document.getElementById('root')
)