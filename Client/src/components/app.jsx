import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formimages: null,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit() {
        var file = new FormData();
        file.append('file', this.state.formimages, 'Form.jpg');

        axios.post("/formtemplate", file);
    }

    onChangeHandler (e) {

        this.setState({
            formimages: e.target.files[0]
        })

    }


    render () {
        return (
            <div>
                <label> Upload Image</label>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <button onClick = {this.submit}>Submit</button>
            </div>
        );
    }
}