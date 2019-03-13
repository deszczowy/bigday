import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-table/react-table.css";
import 'react-tabs/style/react-tabs.css'
import './primitive.css'
import './index.css';

class App extends React.Component{
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
                <Budget />
            </TabPanel>
        </Tabs>
        );
    } 
}

class Budget extends React.Component{
    constructor(){
        super();

        this.state = {
            positions: [
                {id: 1, description: 'white dress', price: 200},
                {id: 2, description: 'restaurant', price: 15000},
                {id: 3, description: 'flowers', price: 50},
            ],

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
        const {positions, newItemName, newItemPrice} = this.state;
        var newId = positions.length +1;

        console.log('sss');
        console.log(newItemName);
        console.log(newItemPrice);
        console.log('ssc');

        if (newItemName){
        const updatedPositions = [...positions, {id: newId, description: newItemName, price: newItemPrice}];

        this.setState(
            {
                positions: updatedPositions,
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
              const positions = [...this.state.positions];
              
              positions[cellInfo.index][cellInfo.column.id] = isNaN(e.target.innerHTML) ? 0 : parseInt(e.target.innerHTML);

              this.setState({ positions });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.positions[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render(){
        const { positions, newItemName, newItemPrice } = this.state;
        const TheadComponent = props => null; // null to hide headers

        var sum = this.sumUp(positions);
        const items = [{label: 'Sum', amount: sum}];

        console.log(positions);
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
                data={positions}
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
    <App />, 
    document.getElementById('root')
)