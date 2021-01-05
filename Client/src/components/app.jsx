import React from 'react';
import axios from 'axios';
import Formtemplate from './FormTemplate.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Choose Template',
            formimages: null
        }
        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit(imgs) {
        console.log('here');
        var pages = ['Choose Template', 'Send Application', 'Summary']
        var nextpg = pages[pages.indexOf(this.state.page) + 1];
        var endpoint;
        if(this.state.page === 'Choose Template') {
            endpoint = "/formtemplate"
          } else if (this.state.page === 'Send Application') {
            endpoint = "/formapplication"
        }
        console.log('here',endpoint);
        // var images = [];
        let file = new FormData();
        for(var i = 0; i < imgs.length; i ++){
            console.log(imgs.length);
            file.append('images', imgs[i], `Formpg${i+1}.jpg`);
        }
        // console.log(file);
        axios.post(endpoint, file)
        .then(() => {
            this.setState({
                page: nextpg
            })
        })
        .catch(e => console.log(e));
    }


    // onChangeHandler (e) {

    //     this.setState({
    //         formimages: e.target.files[0]
    //     })

    // }


    render () {
        return (
            <div>

                <Formtemplate page = {this.state.page} submit = {this.submit}/>
            </div>
        );
    }
}