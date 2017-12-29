import React, { Component } from 'react';
import './App.css';

import Personal from './components/Personal.js';
import Work from './components/Work.js';
import Education from './components/Education.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress:0,
      personal: [],
      work:[],
      education:[]
    }
  }


  //set body color before component is rendered
  componentWillMount(){
    document.body.style.backgroundColor = "#f1c40f";
  }


  //change color of body based on displayed element
  changeColor(element){
    switch(element){
      case 'personal':
        document.body.style.backgroundColor = "#f1c40f";
        break;
      case 'experience':
        document.body.style.backgroundColor = "#2ecc71";
        break;
      case 'education':
        document.body.style.backgroundColor = "#e74c3c";
        break;
      case 'skills':
        document.body.style.backgroundColor = "#3498db";
        break;
      default:
        document.body.style.backgroundColor = "#9b59b6";
        break;
    }
  }


  //go to next state, change body color
  nextProgress(element){
    //update the state
    this.setState({
      progress: this.state.progress + 1
    });
    //call func to change body color
    this.changeColor(element);
  }


  //go to prev state, change body color
  prevProgress(element){
    //update the state
    this.setState({
      progress: this.state.progress - 1
    });
    //call func to change body color
    this.changeColor(element);
  }


  //render the components based on progress
  render() {
    switch(this.state.progress){
      case 0:return (
        <div className="page">
          <ProgressBar progress="20" />
          <br/>
          <Personal />
          <Navigation next={this.nextProgress.bind(this,'experience')} prev="" />
        </div>
      );
      case 1:return (
        <div className="page">
          <ProgressBar progress="40" />
          <br/>
          <Work />
          <Navigation next={this.nextProgress.bind(this,'education')} prev={this.prevProgress.bind(this,'personal')} />
        </div>
      );
      case 2:return (
        <div className="page">
          <ProgressBar progress="60" />
          <br/>
          <Education />
          <Navigation next={this.nextProgress.bind(this,'skills')} prev={this.prevProgress.bind(this,'experience')} />
        </div>
      );
      case 3:return (
        <div className="page">
          <ProgressBar progress="80" />
          <br/>
          <h4>Skills and Qualifications</h4>
          <Navigation next={this.nextProgress.bind(this,'default')} prev={this.prevProgress.bind(this,'education')} />
        </div>
      );
      default:return (
        <div className="page">
          <ProgressBar progress="100" />
          <br/>
          <div className="row">
            <div className="col-sm-12">
              <h4>Final Steps</h4>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-sm-4">
              <div className="final-button">
              <i class="fa fa-share-alt fa-5x"></i>
              <h5>Share CV</h5>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="final-button">
              <i class="fa fa-floppy-o fa-5x"></i>
              <h5>Save XML</h5>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="final-button">
              <i class="fa fa-download fa-5x"></i>
              <h5>Download PDF</h5>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-sm-12">
              <hr/>
            </div>
          </div>

          <Navigation next="" prev={this.prevProgress.bind(this,'skills')} />
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
        <div className="col-sm-6" key={1}>
          <button className="btn btn-light btn-block" onClick={this.props.prev}>Prev</button>
        </div>
      );
    }

    //check if next is set
    if(this.props.next!==""){
      rows.push(
        <div className="col-sm-6" key={2}>
          <button className="btn btn-light btn-block" onClick={this.props.next}>Next</button>
        </div>
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
