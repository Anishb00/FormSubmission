import React from 'react';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formimages: null,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler (e) {
        console.log(e.target);
    }


    render () {
        return (
            <div>
                <label> Upload Image</label>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
            </div>
        );
    }
}