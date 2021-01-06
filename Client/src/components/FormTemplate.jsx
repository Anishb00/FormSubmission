import React from 'react';


class FormTemplate extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      numimages: 1,
      formimages: null,
    }
    this.clickhandler = this.clickhandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  clickhandler () {
    this.props.submit(this.state.formimages);
    var input = document.getElementsByClassName('Fileholder');
    input[0].value = null;
  }

  onChangeHandler (e) {
    // console.log(e.target.value);
    this.setState({
        formimages: e.target.files
    }, () => console.log(this.state.formimages));

  }

  render() {
    if(this.props.page === 'Summary') {
      return null;
    }
    return (
      <div>
        <h1>{this.props.page}</h1>
        <input type="file" name="avatar" multiple onChange={this.onChangeHandler} className = "Fileholder"/>
        <button onClick = {this.clickhandler}>Submit</button>
      </div>

    );
  }

}


// const Image = (props) => {

//   return(
//   <div>
//     <label> Upload Image</label>

//   </div>
//   );
// }


export default FormTemplate;