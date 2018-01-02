import React, { Component } from 'react';
import swal from 'sweetalert';

class Personal extends Component {
  constructor(props){
    super(props);
    this.setPersonal = this.setPersonal.bind(this);
  }
  setPersonal(el){
    console.log(el.target.value);
    console.log(el.target.name);
  }
  removeImage(){
    document.getElementById('output').removeChild(document.getElementById('output').childNodes[1]);
    document.getElementById('dragDrop').classList.remove('hidden');
    document.getElementById('dragDrop').classList.remove('dragover');
  }
  onDrop(el){
    el.preventDefault();
    // fetch FileList object
	  var files = el.target.files || el.dataTransfer.files;

    var reader = new FileReader();
    reader.onload = function(files){
      var dataURL = reader.result;
      var output = document.createElement('img');
      output.src = dataURL;
      output.className = 'output';
      output.onload = function() {
        let width = output.naturalWidth,
            height = output.naturalHeight;

            if(width>500 && height>500){
              document.getElementById('output').appendChild(output);
              document.getElementById('dragDrop').classList.add('hidden');
            }else{
              document.getElementById('dragDrop').classList.remove('dragover');
              swal("Upload Error!", "You uploaded image less than 500x500", "error");
            }
            document.getElementById('file').value = "";
        }
    };
    reader.readAsDataURL(files[0]);
  }
  onDragOver(el){
    el.preventDefault();
    document.getElementById('dragDrop').classList.add('dragover');
  }
  onDragLeave(el){
    el.preventDefault();
    document.getElementById('dragDrop').classList.remove('dragover');
  }
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
            <input type="text" name="name" onChange={this.setPersonal} placeholder="Full name: " />
            <input type="email" name="email" onChange={this.setPersonal} placeholder="Email Address: " />
            <input type="text" name="phone" onChange={this.setPersonal} placeholder="Phone Number: " />
            <hr/>
            <h5>Date of birth</h5>
            <input type="date" name="birthday"/>
            <hr/>
            <h5>Address</h5>
            <input type="text" name="name" placeholder="Address Line 1: " />
            <input type="text" name="name" placeholder="Address Line 2: " />
          </div>
          <div className="col-sm-5">
            <h5>Upload Image</h5>
            <div id="output">
              <div id="overlay" onClick={this.removeImage.bind(this)}><i className="fa fa-times fa-5x" aria-hidden="true"></i></div>
            </div>
            <div className="text-center dragDrop" id="dragDrop" onDragLeave={this.onDragLeave.bind(this)} onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
              <p><i className="fa fa-picture-o fa-4x" aria-hidden="true"></i></p>
              <label htmlFor="file"><strong>Choose an image</strong><span className="box_dragndrop"> or drag it here</span>.</label>
              <input className="box_file" onChange={this.onDrop.bind(this)} type="file" name="files" id="file" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Personal;
