import React, { Component } from 'react';

//import needed components
import PersonalSection from './profile/PersonalSection.js';
import WorkSection from './profile/WorkSection.js';
import EducationSection from './profile/EducationSection.js';
import SkillsSection from './profile/SkillsSection.js';

class Profile extends Component {
  constructor(props){
    super(props);
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor(color){
    //console.log(color);
    document.body.style.backgroundColor = color;
  }
  generatePDF(){
    var element = document.getElementById('colorPalette')
    if (element.classList.contains('hidden')){
      element.classList.remove('hidden');
    }else{
      element.classList.add('hidden');
    }
  }
  render(){
    return (
      <div className="profile">

        <PersonalSection personal={this.props.data.personal} skills={this.props.data.skills} />

        <div className="row">
          <div className="col-sm-12">

          <WorkSection data={this.props.data.work} />
          <EducationSection data={this.props.data.education} />
          <SkillsSection data={this.props.data.skills} />

          </div>
        </div>

        <span className="fa-stack fa-2x final-button one" onClick={this.generatePDF.bind(this)} >
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-tint fa-stack-1x fa-inverse"></i>
        </span>

        <div id="colorPalette" className="colorPalette hidden">
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#fdc318'}} onClick={this.changeColor.bind(this,'#fdc318')}></i>
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#e67e22'}} onClick={this.changeColor.bind(this,'#e67e22')}></i>
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#e74c3c'}} onClick={this.changeColor.bind(this,'#e74c3c')}></i>
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#3498db'}} onClick={this.changeColor.bind(this,'#3498db')}></i>
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#2ecc71'}} onClick={this.changeColor.bind(this,'#2ecc71')}></i>
          <i className="fa fa-circle fa-2x fa-inverse" style={{color:'#9b59b6'}} onClick={this.changeColor.bind(this,'#9b59b6')}></i>
        </div>

      </div>
    );
  }
}

export default Profile;
