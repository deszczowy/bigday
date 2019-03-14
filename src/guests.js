import React from 'react';

export default class GuestList extends React.Component {
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