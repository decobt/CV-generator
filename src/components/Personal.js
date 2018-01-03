import React, { Component } from 'react';
import swal from 'sweetalert';

class Personal extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo:''
    }
    this.setPersonal = this.setPersonal.bind(this);
  }

  /*
  * setPersonal function that processes form submitForm
  * input: form values
  * output: return object containing all form values
  */
  setPersonal(el){
    //prevent default event
    el.preventDefault();

    //define needed variables
    var form = el.target;
    var values = {
      image: this.state.photo,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      birthday: form.birthday.value,
      address1: form.address1.value,
      address2: form.address2.value
    }
    //return the object with input values
    this.props.returnValues(values,'personal', null);
  }

  /*
  * Removes the image from the document
  * Removes (hidden, dragover) from classList on dragDrop field
  * Changes state to have empty photo
  */
  removeImage(){
    //remove the image element
    document.getElementById('output').removeChild(document.getElementById('output').childNodes[1]);
    //remove the hidden class from the drag and drop field
    document.getElementById('dragDrop').classList.remove('hidden');
    //remove the dragover class from the drag and drop field
    document.getElementById('dragDrop').classList.remove('dragover');
    //change state to have empty photo
    this.setState({
      photo:''
    });
  }

  /*
  * OnDrop function that runs when user drops a file over the field
  * get the file, process the files
  * check for conditions like dimensions and file type
  */
  onDrop(el){
    //prevent default behavior
    el.preventDefault();
    // fetch FileList object
	  var files = el.target.files || el.dataTransfer.files;

    //define reader
    var reader = new FileReader();
    reader.onload = function(files){
      //dataURL holds the result, image in base64
      var dataURL = reader.result;
      //create an image element
      var output = document.createElement('img');
      //set src atribute to have the value of dataURL
      output.src = dataURL;
      //set the class
      output.className = 'output';
      //onload run the function
      output.onload = function() {
        //set variables with image dimensions
        let width = output.naturalWidth,
            height = output.naturalHeight;

            //check the image dimensions
            if(width>500 && height>500){
              document.getElementById('output').appendChild(output);
              document.getElementById('dragDrop').classList.add('hidden');
              this.setState({
                photo: dataURL
              });
            }else{
              //display error if image is less than 500x500
              document.getElementById('dragDrop').classList.remove('dragover');
              swal("Upload Error!", "You uploaded image less than 500x500", "error");
            }
            //clear file input
            document.getElementById('file').value = "";
        }.bind(this);
    }.bind(this);
    reader.readAsDataURL(files[0]);
  }

  /*
  * Render the component
  */
  render(){
    return (
      <div className="personal">

        <div className="row">
          <div className="col-sm-12">
            <h4>Personal Information</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-7">
            <h5>Basic Information</h5>
              <PersonalForm formSubmit={this.setPersonal} data={this.props.data} />
          </div>
          <div className="col-sm-5">
            <h5>Upload Image</h5>
            <DragDropField onDrop={this.onDrop.bind(this)} removeImage={this.removeImage.bind(this)} />
          </div>
        </div>

      </div>
    );
  }
}

/*
* PersonalForm component
* holds the form elements of the personal bio form
*/
class PersonalForm extends Component{
  render(){
    var personal = this.props.data;
    return (
      <form onSubmit={this.props.formSubmit}>
        <input type="text" name="name" placeholder="Full name: " defaultValue={personal.name} required/>
        <input type="email" name="email" placeholder="Email Address: " defaultValue={personal.email} required/>
        <input type="text" name="phone" placeholder="Phone Number: " defaultValue={personal.phone} required/>
        <hr/>
        <h5>Date of birth</h5>
        <input type="date" name="birthday" defaultValue={personal.birthday} required/>
        <hr/>
        <h5>Address</h5>
        <input type="text" name="address1" placeholder="Street: " defaultValue={personal.address1} required/>
        <input type="text" name="address2" placeholder="City, Country: " defaultValue={personal.address2}/>

        <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Personal Bio</button>
      </form>
    );
  }
}

/*
* The drag and drop field component
*/
class DragDropField extends Component{
  /*
  * Function that lunches when drag over dragDrop field
  * adds class to dragDrop field
  */
  onDragOver(el){
    el.preventDefault();
    //add dragover class to classList
    document.getElementById('dragDrop').classList.add('dragover');
  }

  /*
  * Function that lunches when drag leaves dragDrop field
  * removes class to dragDrop field
  */
  onDragLeave(el){
    el.preventDefault();
    //remove dragover class from classList
    document.getElementById('dragDrop').classList.remove('dragover');
  }

  /*
  * Render function for the component
  */
  render(){
    return (
      <div>
        <div id="output">
          <div id="overlay" onClick={this.props.removeImage}><i className="fa fa-times fa-5x" aria-hidden="true"></i></div>
        </div>
        <div className="text-center dragDrop" id="dragDrop" onDragLeave={this.onDragLeave.bind(this)} onDrop={this.props.onDrop} onDragOver={this.onDragOver.bind(this)}>
          <p><i className="fa fa-picture-o fa-4x" aria-hidden="true"></i></p>
          <label htmlFor="file"><strong>Choose an image</strong><span className="box_dragndrop"> or drag it here</span>.</label>
          <input className="box_file" onChange={this.props.onDrop} type="file" name="files" id="file" />
        </div>
      </div>
    );
  }
}

//export Personal component
export default Personal;
