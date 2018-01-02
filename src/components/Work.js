import React, { Component } from 'react';

class Work extends Component {
  //checkBox
  checkBox(el){
    if(el.target.checked){
      document.getElementById('end-date').disabled = true;
    }else{
      document.getElementById('end-date').disabled = false;
    }
  }
  submitForm(){
    console.log('works');
  }

  render(){
    return (
      <div className="work">

        <div className="row">
          <div className="col-sm-12">
            <h4>Work experience</h4>
          </div>
          <div className="col-sm-12">
            <div data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" className="text-center fillIn">
              <strong> + Add Work Experience</strong>
            </div>
          </div>
        </div>

      <div className="collapse" id="collapseExample">

        <div className="row">
            <div className="col-sm-6">
              <input type="text" name="name" placeholder="Occupation or position held: " />
              <input type="text" name="name" placeholder="Employer Name: " />
              <input type="text" name="name" placeholder="Employer Address: " />
              <input type="text" name="name" placeholder="Employer Website: " />
            </div>
            <div className="col-sm-6">
              <div style={{margin:'3% 0'}}>
                <h5>Start Date:</h5>
                <input type="date" name="start-date" id="start-date"/>
                <h5>End Date:</h5>
                <input type="date" name="end-date" id="end-date"/>
                <div className="form-check text-left">
                  <input type="checkbox" onChange={this.checkBox.bind(this)} className="form-check-input" style={{width:'auto'}} id="exampleCheck1"/>
                  <label className="form-check-label">Ongoing</label>
                </div>
              </div>
            </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <button className="btn btn-info btn-block" onClick={this.submitForm.bind(this)}>Add Work</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <hr/>
          </div>
        </div>

      </div>

    </div>
    );
  }
}

export default Work;
