import React, { Component } from 'react';

class Education extends Component {
  submitForm(e){
    //prevent default event
    e.preventDefault();

    //define needed variables, form and endDate helper variable
    var form = e.target;
    var endDate;

    //check if checkbox Ongoing is selected
    //set value of endDate based on checkbox status
    if(form.ongoing.checked){
      endDate = 'Ongoing';
    }else{
      endDate = form.endDate.value;
    }

    //create object with all form values
    var values = {
      qualification:form.qualification.value,
      organization:form.organization.value,
      address:form.address.value,
      description:form.description.value,
      start:form.startDate.value,
      end:endDate
    }

    //return the object with input values
    this.props.returnValues(values,'education', form);
  }


  renderQualification(data){
    var output = [];
    if( data.length > 0 ){
      for(var i=0; i<data.length; i++){
        output.push(
          <div className="row" key={i}>
            <div className="col-sm-12">
              <div className="timeline_panel">
              <div className="row">
                <div className="col-sm-3">
                <div className="mainIcon" style={{background:"#fdc318"}}><i className="fa fa-graduation-cap fa-5x" aria-hidden="true"></i></div>
                <button className="btn btn-default btn-block" style={{borderRadius:'0px'}}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div className="col-sm-9">
                <h4 style={{color:'#fdc318'}}>{data[i].qualification}</h4>
                <h5>{data[i].organization}, {data[i].address}, {data[i].website}</h5>
                <p><i className="fa fa-calendar" aria-hidden="true"></i> From: {data[i].start}, <i className="fa fa-calendar" aria-hidden="true"></i> To: {data[i].end}</p>
                <p>{data[i].description}</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        );
      }//end of for
    }else{
      output = [];
    }

    return output;
  }

  render(){
    var qualification = this.renderQualification(this.props.data);
    return (
      <div className="education">
          <div className="row">
            <div className="col-sm-12">
              <h4>Education and Training</h4>
            </div>
          </div>

          <div className="qualification">
              {qualification}
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div data-toggle="collapse" data-target="#collapseEducation" aria-expanded="false" aria-controls="collapseEducation" className="text-center fillIn">
                <strong><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Education or Training</strong>
              </div>
            </div>
          </div>

          <EducationForm formFunc={this.submitForm.bind(this)}/>

        </div>
    );
  }
}

class Separator extends Component{
  render(){
    return(
      <div className="row">
        <div className="col-sm-12">
          <hr/>
        </div>
      </div>
    );
  }
}

class EducationForm extends Component{
  //checkBox
  checkBox(el){
    if(el.target.checked){
      document.getElementById('end-date').disabled = true;
    }else{
      document.getElementById('end-date').disabled = false;
    }
  }
  render(){
    return(
        <form onSubmit={this.props.formFunc}>
        <div className="collapse" id="collapseEducation">

          <Separator />

          <div className="row">
              <div className="col-sm-6">
                <input type="text" name="qualification" placeholder="Title of qualification awarded: " />
                <input type="text" name="organization" placeholder="Organisation providing education or training: " />
                <input type="text" name="address" placeholder="Organisation Address: " />
                <h5>Optional Description:</h5>
                <textarea name="description" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="col-sm-6">
                <div style={{margin:'3% 0'}}>
                  <h5>Start Date:</h5>
                  <input type="date" name="startDate" id="start-date"/>
                  <h5>End Date:</h5>
                  <input type="date" name="endDate" id="end-date"/>
                  <div className="form-check text-left">
                    <input name="ongoing" type="checkbox" onChange={this.checkBox.bind(this)} className="form-check-input" style={{width:'auto'}} id="exampleCheck1"/>
                    <label className="form-check-label">Ongoing</label>
                  </div>
                </div>
              </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-default btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Work</button>
            </div>
          </div>

          <Separator />

        </div>
        </form>
      );
    }
}
export default Education;
