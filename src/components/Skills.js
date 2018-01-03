import React, { Component } from 'react';

class Skills extends Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  /*
  * Function that processes the form submission
  * input: form values
  * output: returns object with form values
  */
  submitForm(el){
    el.preventDefault();

    //define needed variables
    var form = el.target;

    //create object with all form values
    var values = {
      about: form.about.value,
      social:{
        change:true,
        twitter: form.twitter.value,
        linkedin: form.linkedin.value,
        youtube: form.youtube.value,
        github: form.github.value,
        bitbucket: form.bitbucket.value
      },
      skills: {
        communicative: form.communicative.value,
        responsible: form.responsible.value,
        creative: form.creative.value,
        multitasking: form.multitasking.value,
        computerSkills: form.computerSkills.value,
        organizationalSkills: form.organizationalSkills.value
      }
    }

    //return the object with input values
    this.props.returnValues(values,'skills', null);
  }

  /*
  * Render the component
  */
  render(){
    return (
      <div className="skills">
        <div className="row">
          <div className="col-sm-12">
            <h4>Skills and competencies</h4>
          </div>
        </div>

        <SkillsForm formSubmit={this.submitForm} data={this.props.data}/>

      </div>
    );
  }
}

/*
* Skills form component
*/
class SkillsForm extends Component{
  render(){
    var data = this.props.data;
    return (
      <form onSubmit={this.props.formSubmit}>
      <div className="row">
        <div className="col-sm-12">
          <h5>Describe yourself in few sentences:</h5>
          <textarea style={{marginTop:'0px'}} name="about" className="form-control" rows="3" defaultValue={data.about} required></textarea>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">

          <h6>Social Media Links:</h6>
          <input type="text" name="linkedin" placeholder="Linkedin: " defaultValue={data.social.linkedin}/>
          <input type="text" name="youtube" placeholder="Youtube: " defaultValue={data.social.youtube}/>
          <input type="text" name="twitter" placeholder="Twitter: " defaultValue={data.social.twitter}/>
          <input type="text" name="github" placeholder="GitHub: " defaultValue={data.social.github}/>
          <input type="text" name="bitbucket" placeholder="BitBucket: " defaultValue={data.social.bitbucket}/>

        </div>
        <div className="col-sm-6">

          <h6>Personal Skills:</h6>
          <RangeSlider name="communicative" title="Communicative" data={data.skills.communicative} />
          <RangeSlider name="responsible" title="Responsible" data={data.skills.responsible} />
          <RangeSlider name="creative" title="Creative" data={data.skills.creative} />
          <RangeSlider name="multitasking" title="MultiTasking" data={data.skills.multitasking} />
          <RangeSlider name="computerSkills" title="Computer Skills" data={data.skills.computerSkills} />
          <RangeSlider name="organizationalSkills" title="Organizational Skills" data={data.skills.organizationalSkills} />

        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add Competencies</button>
        </div>
      </div>
      </form>
    );
  }
}


/*
* RangeSlider component, range input field
*/
class RangeSlider extends Component{
  constructor(props){
    super(props);
    this.rangeUpdate = this.rangeUpdate.bind(this);
  }

  /*
  * Update span component when range input Changes
  * Indicator of current range state
  */
  rangeUpdate(el){
    document.getElementById(el.target.name).innerHTML = el.target.value;
  }

  /*
  * Render the component
  */
  render() {
    return (
      <div className="text-left">
      <h6>{this.props.title} - <strong><span id={this.props.name}>{this.props.data}</span>%</strong></h6>
      <div className="range-slider">
        <input name={this.props.name} className="range-slider__range" type="range" min="0" max="100" defaultValue={this.props.data} onChange={this.rangeUpdate} />
      </div>
      </div>
    );
  }
}

//export component
export default Skills;
