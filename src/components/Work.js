import React, { Component } from 'react';

class Work extends Component {
  /*
  * Submit Form function
  * input: form input values
  * output: returns object containing all form values
  */
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
      position:form.position.value,
      employer:form.employer.value,
      address:form.address.value,
      website:form.website.value,
      description:form.description.value,
      start:form.startDate.value,
      end:endDate
    }

    //return the object with input values
    this.props.returnValues(values,'work', form);
  }

  /*
  * Function used to remove data
  */
  removeWork(index){
    //console.log(values);
    this.props.removeValues(index,'work');
  }

  /*
  * Function that renders the qualifications from the data
  * input: data
  * output: generated output code
  */
  renderWork(data){
    //define a variable to hold the output
    var output = [];
    //check if data is empty
    if( data.length > 0 ){
      //if not empty, loop through the values
      for(var i=0; i<data.length; i++){
        //push code to output variable
        output.push(
          <div className="row" key={i}>
            <div className="col-sm-12">
              <div className="timeline_panel">
              <div className="row">
                <div className="col-sm-3">
                <div className="mainIcon" style={{background:"#fdc318"}}><i className="fa fa-building fa-5x" aria-hidden="true"></i></div>
                <button onClick={this.removeWork.bind(this,i)} className="btn btn-default btn-block" style={{borderRadius:'0px'}}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div className="col-sm-9">
                <h4 style={{color:'#fdc318'}}>{data[i].position}</h4>
                <h5>{data[i].employer}, {data[i].address}, {data[i].website}</h5>
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
      //no output, so assign an empty array to output
      output = [];
    }
    //return back output
    return output;
  }

  /*
  * Render the component
  */
  render(){
    //get rendered work experience from the data
    var work = this.renderWork(this.props.data);
    return (
      <div className="work">
        <div className="row">
          <div className="col-sm-12">
            <h4>Work experience</h4>
          </div>
        </div>

        <div className="qualification">
            {work}
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div data-toggle="collapse" data-target="#collapseWork" aria-expanded="false" aria-controls="collapseWork" className="text-center fillIn">
              <strong><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Work Experience</strong>
            </div>
          </div>
        </div>

        <WorkForm formFunc={this.submitForm.bind(this)} />

    </div>
    );
  }
}

/*
* Separator component
*/
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

/*
* WorkForm component
* holds the form inputs for work experience
*/
class WorkForm extends Component{
  /*
  * Check if checkbox is clicked
  * if clicked, disable the end date
  */
  checkBox(el){
    if(el.target.checked){
      document.getElementById('end-date').disabled = true;
    }else{
      document.getElementById('end-date').disabled = false;
    }
  }

  /*
  * Render the component
  */
  render() {
    return (
      <form onSubmit={this.props.formFunc}>
      <div className="collapse" id="collapseWork">

        <Separator />

        <div className="row">
            <div className="col-sm-6">
              <input type="text" name="position" placeholder="Occupation or position held: " required/>
              <input type="text" name="employer" placeholder="Employer Name: " required/>
              <input type="text" name="address" placeholder="Employer Address: " required/>
              <input type="text" name="website" placeholder="Employer Website: " />
              <h5>Optional Description:</h5>
              <textarea name="description" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="col-sm-6">
              <div style={{margin:'3% 0'}}>
                <h5>Start Date:</h5>
                <input type="date" name="startDate" id="start-date" required/>
                <h5>End Date:</h5>
                <input type="date" name="endDate" id="end-date" required/>
                <div className="form-check text-left">
                  <input name="ongoing" type="checkbox" onChange={this.checkBox.bind(this)} className="form-check-input" style={{width:'auto'}} id="exampleCheck1"/>
                  <label className="form-check-label">Ongoing</label>
                </div>
              </div>
            </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Work</button>
          </div>
        </div>

        <Separator />

        </div>
      </form>
    );
  }
}

export default Work;
