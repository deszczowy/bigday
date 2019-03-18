import React from 'react';

export default class GuestList extends React.Component {
    render(){
        

        return (
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
        );
    }
}