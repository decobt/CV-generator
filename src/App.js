import React, { Component } from 'react';
import swal from 'sweetalert'
import './App.css';

import Personal from './components/Personal.js';
import Work from './components/Work.js';
import Education from './components/Education.js';
import Profile from './components/Profile.js';
import Skills from './components/Skills.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress:0,
      personal: {},
      work:[],
      education:[],
      skills: {
        social:{
          change:false
        },
        skills:{
          communicative: "0",
          responsible: "0",
          creative: "0",
          multitasking: "0",
          computerSkills: "0",
          organizationalSkills: "0"
        }
      }
    }
    this.nextProgress = this.nextProgress.bind(this);
    this.prevProgress = this.prevProgress.bind(this);
    this.processInput = this.processInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }

  //go to next state
  nextProgress(){
    //update the state
    this.setState({
      progress: this.state.progress + 1
    });
  }

  //go to prev state
  prevProgress(){
    //update the state
    this.setState({
      progress: this.state.progress - 1
    });
  }

  removeInput(index, option){
    var ar;
    //assign values based on option
    switch(option){
      case 'education': { ar = this.state.education; break;}
      case 'work': { ar = this.state.work; break;}
      default: { ar = []; break;}
    }
    //remove item from array
    ar.splice(index,1);
    //update the state with now updated array
    this.setState({
      [option]: ar
    });
  }

  processInput(values, option, form){
    console.log(values);

    if(option === 'personal'){
      this.setState({
        personal: values
      });
      swal("Success", "Personal Bio has been added!","success");
    }else if(option === 'education'){
      this.setState({
        education: [...this.state.education, values]
      });
      swal("Success", "Qualification has been added!","success")
      .then(function(){
        form.reset();
        document.getElementById('collapseEducation').classList.remove("show");
      });
    }else if(option === 'work'){
      this.setState({
        work: [...this.state.work, values]
      });
      swal("Success", "Work Experience has been added!","success")
      .then(function(){
        form.reset();
        document.getElementById('collapseWork').classList.remove("show");
      });
    }else if(option === 'skills'){
      this.setState({
        skills: values
      });
      swal("Success", "Skills and competencies have been added!","success");
    }
  }

  //render the components based on progress
  render() {
    switch(this.state.progress){
      case 0:return (
        <div className="page">
          <ProgressBar progress="20" />
          <br/>
          <Personal returnValues={this.processInput} data={this.state.personal} />
          <Navigation next={this.nextProgress} prev="" />
        </div>
      );
      case 1:return (
        <div className="page">
          <ProgressBar progress="40" />
          <br/>
          <Work returnValues={this.processInput} data={this.state.work} removeValues={this.removeInput}/>
          <Navigation next={this.nextProgress} prev={this.prevProgress} />
        </div>
      );
      case 2:return (
        <div className="page">
          <ProgressBar progress="60" />
          <br/>
          <Education returnValues={this.processInput} data={this.state.education} removeValues={this.removeInput}/>
          <Navigation next={this.nextProgress} prev={this.prevProgress} />
        </div>
      );
      case 3:return (
        <div className="page">
          <ProgressBar progress="80" />
          <br/>
          <Skills returnValues={this.processInput} data={this.state.skills} />
          <Navigation next={this.nextProgress} prev={this.prevProgress} />
        </div>
      );
      default:return (
        <div className="page">
          <ProgressBar progress="100" />
          <br/>
          <Profile data={this.state} />

          <span className="fa-stack fa-2x final-button two" onClick={this.prevProgress}>
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-undo fa-stack-1x fa-inverse"></i>
          </span>

        </div>
      );
    }
  }
}

// class for the progress bar on top of the page
class ProgressBar extends Component{
  render(){
    return (
      <div className="progress" style={{ height: '5px'}}>
        <div className="progress-bar" role="progressbar" style={{ backgroundColor:'#333' , width: this.props.progress+'%' }} aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    );
  }
}

// class for navigation at bottom of page
class Navigation extends Component{
  render(){
    var rows = [];

    //check if prev is set
    if(this.props.prev!==""){
      rows.push(
        <span key="2" className="fa-stack fa-2x final-button two" onClick={this.props.prev}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-arrow-circle-left fa-stack-1x fa-inverse"></i>
        </span>
      );
    }

    //check if next is set
    if(this.props.next!==""){
      rows.push(
        <span key="1" className="fa-stack fa-2x final-button one" onClick={this.props.next}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-arrow-circle-right fa-stack-1x fa-inverse"></i>
        </span>
      );
    }

    return (
      <div className="row">
        {rows}
      </div>
    );
  }
}

export default App;
