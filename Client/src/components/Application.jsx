// import React from 'react';



class App extends React.Component {
  constuctor (props) {
    super(props);
    this.state = {

    }
  }



  render(){
    return(
      <input type="file" name="avatar" multiple onChange={props.onChange}/>
      <button onClick = {() => this.props.submit(this.state.formimages)}>Submit</button>
    )
  }
}