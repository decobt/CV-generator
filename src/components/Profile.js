import React, { Component } from 'react';

//import needed components
import PersonalSection from './profile/PersonalSection.js';
import WorkSection from './profile/WorkSection.js';
import EducationSection from './profile/EducationSection.js';
import SkillsSection from './profile/SkillsSection.js';

class Profile extends Component {
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

        <span className="fa-stack fa-2x final-button one" >
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-download fa-stack-1x fa-inverse"></i>
        </span>

      </div>
    );
  }
}

export default Profile;
