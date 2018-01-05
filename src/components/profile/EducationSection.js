import React, { Component } from 'react';

class EducationSection extends Component{
  generateEducation(data){
    var output = [];
    //check if data is empty
    if( data.length > 0 ){
      //if not empty, loop through the values
      for(var i=0; i<data.length; i++){
        //push code to output variable
        output.push(
          <div className="row" style={{marginBottom:'20px'}} key={i}>
            <div className="col-sm-4 col-md-3 text-center">
              <span id="date1" className="timelineDate date1" style={{width:'100%'}}>{data[i].end}</span>
              <span id="date2" className="timelineDate date2" style={{width:'100%'}}>{data[i].start}</span>
            </div>
            <div className="col-sm-8 col-md-9">
                <div className="arrow_box arrow_box_left">
                  <h5 id="mainTitle">{data[i].qualification}</h5>
                  <h6>{data[i].organization}</h6>
                  <p><i className="fa fa-map-marker" aria-hidden="true"></i> {data[i].address}</p>
                  <p>{data[i].description}</p>
                </div>
            </div>
          </div>
        );
      }
    }else{
      output.push(
        <p key="1" className="text-center"> You have not added any education and qualification yet.</p>
      );
    }
    return output;
  }
  render(){
    var rows = this.generateEducation(this.props.data);
    return (
    <div className="educationSection">
      <div style={{background:'#f1f1f1', padding:'20px'}}>
        <div className="header text-center">
          <span className="fa-stack fa-3x">
            <i className="fa fa-circle-thin fa-stack-2x"></i>
            <i className="fa fa-graduation-cap fa-stack-1x"></i>
          </span>
          <h5>Education and qualification</h5>
        </div>
      </div>
      <div style={{background:'#f9f9f9', padding:'20px', marginBottom:'20px'}}>
        <div className="text-left">
          {rows}
        </div>
      </div>
    </div>
    );
  }
}

export default EducationSection;
