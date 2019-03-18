import React from 'react'

export default class BudgetForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            newItemName: '',
            newItemPrice: 0.0
        }
    }

    addItem = (e) => {
        const {newItemName, newItemPrice} = this.state;

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

    changeField = (e) =>{
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

    render() {
        const { newItemName, newItemPrice } = this.state;

        return (
            <div className="addItem">
                <label>New item:
                <input type="text" name="newItemName" value={newItemName} onChange={this.changeField}/>
                </label>
                <br />
                <label>Price:
                <input type="number" name="newItemPrice" value={newItemPrice} onChange={this.changeField}/>
                </label>
                <br />
                <button onClick={this.addItem}>Add</button>
            </div>
        );
    }
}