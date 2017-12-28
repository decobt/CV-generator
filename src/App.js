import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress:0,
      personal: [],
      work:[],
      education:[]
    }
    this.nextProgress = this.nextProgress.bind(this);
  }
  nextProgress(){
    this.setState({
      progress: this.state.progress + 1
    });
  }
  render() {
    switch(this.state.progress){
      case 0:return (
        <div>
        <p>Personal Information</p>
        <button onClick={this.nextProgress}>Next</button>
        </div>
      );
      case 1:return (
        <div>
        <p>Work Experience</p>
        <button onClick={this.nextProgress}>Next</button>
        </div>
      );
      case 2:return (
        <div>
        <p>Education and Training</p>
        <button onClick={this.nextProgress}>Next</button>
        </div>
      );
      default:return (
        <div>
          <p>Download PDF file</p>
        </div>
      );
    }

  }
}

export default App;
