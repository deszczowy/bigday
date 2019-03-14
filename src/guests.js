import React from 'react';

export default class GuestList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            guestName: "",
            guestSide: 0
        }
    }

    onChange = (e) => {
        this.setState(
            {[e.target.name]: e.target.value}
        )
    }

    onFormSubmit = (e) => {
        const {guestName, guestSide} = this.state;
        if (guestName) {
            this.props.updateList(guestName, guestSide);

            this.setState({            
                guestSide: 0,
                guestName: ""
            });
        }
    }

    render(){
        const { guestName, guestSide } = this.state;

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
                            this.props.list.map(
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