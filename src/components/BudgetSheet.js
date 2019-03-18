import React from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

export default class BudgetSheet extends React.Component{
    constructor(props){
        super(props);
        this.renderEditable = this.renderEditable.bind(this);
    }

    sumUp(items){
        var sum = 0.0;
        if (items){
        for(var i = 0; i < items.length; i++)
        {
            sum += items[i].price;
        }
    }
        return sum;
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
        
        const TheadComponent = props => null; // null to hide headers

        var sum = this.sumUp(this.props.entries);
        const items = [{label: 'Sum', amount: sum}];

        return (
            <div>
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
                noDataText="No items found."
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