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
      progress:4,
      personal: {image:""},
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
    //bind functions
    this.processInput = this.processInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }

  /*
  * Function used to change the progress
  */
  changeProgress(num){
    //update the state
    this.setState({
      progress: num
    });
  }

  /*
  * Function to remove obj from education or work arrays
  * input: index (item in array to remove), option (which array to use)
  */
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

  /*
  * Function to process input send back from the forms
  * input: values(object), option(state variable), form object
  * the function changes the state values
  */
  processInput(values, option, form){
    //check option against few conditions
    if(option === 'image'){
      //change the state
      this.setState({
        personal: {...this.state.personal, image:values.image}
      });
    }else if(option === 'personal'){
      //change the state
      this.setState({
        personal: {
          ...this.state.personal,
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthday: values.birthday,
          address1: values.address1,
          address2: values.address2
        }
      });
      //display success alert message
      swal("Success", "Personal Info has been added!","success");
    }else if(option === 'education'){
      //change the state if option equals education
      this.setState({
        education: [...this.state.education, values]
      });
      //display alert for success
      swal("Success", "Qualification has been added!","success")
      .then(function(){
        //after the user dismisses the alert, reset form
        form.reset();
        //hide the form
        document.getElementById('collapseEducation').classList.remove("show");
      });
    }else if(option === 'work'){
      //change the state if option equals work
      this.setState({
        work: [...this.state.work, values]
      });
      //display success alert
      swal("Success", "Work Experience has been added!","success")
      .then(function(){
        //once the user dismisses the alert, clear the form and hide it
        form.reset();
        document.getElementById('collapseWork').classList.remove("show");
      });
    }else if(option === 'skills'){
      //if options equals skills, update the state
      this.setState({
        skills: values
      });
      //display success alert message
      swal("Success", "Skills and competencies have been added!","success");
    }
  }

  /*
  * render the components based on progress
  */
  render() {
    switch(this.state.progress){
      case 0:return (
        <div className="page">
          <ProgressBar progress="20" />
          <br/>
          <Personal returnValues={this.processInput} data={this.state.personal} />
          <Navigation next={this.changeProgress.bind(this,1)} prev="" />
        </div>
      );
      case 1:return (
        <div className="page">
          <ProgressBar progress="40" />
          <br/>
          <Work returnValues={this.processInput} data={this.state.work} removeValues={this.removeInput}/>
          <Navigation next={this.changeProgress.bind(this,2)} prev={this.changeProgress.bind(this,0)} />
        </div>
      );
      case 2:return (
        <div className="page">
          <ProgressBar progress="60" />
          <br/>
          <Education returnValues={this.processInput} data={this.state.education} removeValues={this.removeInput}/>
          <Navigation next={this.changeProgress.bind(this,3)} prev={this.changeProgress.bind(this,1)} />
        </div>
      );
      case 3:return (
        <div className="page">
          <ProgressBar progress="80" />
          <br/>
          <Skills returnValues={this.processInput} data={this.state.skills} />
          <Navigation next={this.changeProgress.bind(this,4)} prev={this.changeProgress.bind(this,2)} />
        </div>
      );
      default:return (
        <div className="page">
          <ProgressBar progress="100" />
          <br/>
          <Profile data={this.state} />

          <span className="fa-stack fa-2x final-button three" onClick={this.changeProgress.bind(this,0)}  data-toggle="tooltip" data-placement="left" title="Edit profile">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
          </span>

        </div>
      );
    }
  }
}

/*
* class for the progress bar on top of the page
*/
class ProgressBar extends Component{
  render(){
    return (
      <div className="progress" style={{ height: '5px'}}>
        <div className="progress-bar" role="progressbar" style={{ backgroundColor:'#333' , width: this.props.progress+'%' }} aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    );
  }
}

/*
* class for navigation at bottom of page
*/
class Navigation extends Component{
  render(){
    var rows = [];

    //check if prev is set
    if(this.props.prev!==""){
      rows.push(
        <span key="2" className="fa-stack fa-2x final-button two" onClick={this.props.prev} data-toggle="tooltip" data-placement="left" title="Next">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i id="fixed-icon" className="fa fa-arrow-circle-left fa-stack-1x fa-inverse"></i>
        </span>
      );
    }

    //check if next is set
    if(this.props.next!==""){
      rows.push(
        <span key="1" className="fa-stack fa-2x final-button one" onClick={this.props.next} data-toggle="tooltip" data-placement="left" title="Back">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i id="fixed-icon" className="fa fa-arrow-circle-right fa-stack-1x fa-inverse"></i>
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

//export App component
export default App;
