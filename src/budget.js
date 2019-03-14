import React from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

export default class Budget extends React.Component{
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