import React, { Component } from 'react';

class SkillsSection extends Component{
  render() {
    var skills = this.props.data;
    return (
    <div id="skillSection" className="skillSection">
      <div style={{background:'#f1f1f1', padding:'20px'}}>
        <div className="header text-center">
          <span className="fa-stack fa-3x">
            <i className="fa fa-circle-thin fa-stack-2x"></i>
            <i className="fa fa-star fa-stack-1x"></i>
          </span>
          <h5>Skills and Competencies</h5>
        </div>
      </div>
      <div style={{background:'#f9f9f9', padding:'20px', marginBottom:'20px'}}>
        <div className="text-left">

          <SkillRangeSection data={skills.skills} />

        </div>
      </div>
    </div>
    );
  }
}

/*
* Component that displays the progress section for Skills Section on profile
*/
class SkillRangeSection extends Component{
  render(){
    var skills = this.props.data;
    if(skills.communicative!=="0" || skills.responsible!=="0" || skills.computerSkills!=="0" ||
      skills.creative!=="0" || skills.multitasking!=="0" || skills.organizationalSkills!=="0"){
      return (
        <div className="row">
        <div className="col-sm-6">
          <SkillProgress data={skills.communicative} title="Communicative" />
          <SkillProgress data={skills.responsible} title="Responsible" />
          <SkillProgress data={skills.computerSkills} title="Computer Skills" />
        </div>

        <div className="col-sm-6">
          <SkillProgress data={skills.creative} title="Creative" />
          <SkillProgress data={skills.multitasking} title="MultiTasking" />
          <SkillProgress data={skills.organizationalSkills} title="Organizational skills" />
        </div>
        </div>
      );
    }else{
      return (<p className="text-center"> You have not set your skills and competencies yet.</p>);
    }
  }
}

/*
* Component that displays the progress for Skills Section on profile
*/
class SkillProgress extends Component{
  render(){
    return (
      <div style={{marginBottom:'20px'}}>
        <h5>{this.props.title} - {this.props.data}%</h5>
        <div className="progress" style={{ height: '15px'}}>
          <div className="progress-bar newProgress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: this.props.data +'%' }} aria-valuenow={this.props.data} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    )
  }
}

export default SkillsSection;
