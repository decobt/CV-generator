import React, { Component } from 'react';

//import needed components
import PersonalSection from './profile/PersonalSection.js';
import WorkSection from './profile/WorkSection.js';
import EducationSection from './profile/EducationSection.js';
import SkillsSection from './profile/SkillsSection.js';

//import html2canvas,jsPDF used to generate pdf document
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class Profile extends Component {
  constructor(props){
    super(props);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      loading: true
    }
  }

  /*
  * when component is finished rendering, fire this function
  */
  componentDidMount(){
    //set a 3 sec timeout, after which update the state
    setTimeout(function(){
      this.setState({
        loading:false
      })
    }.bind(this), 3000);
  }

  /*
  * Function used to change BG color
  */
  changeColor(color){
    //console.log(color);
    document.body.style.backgroundColor = color;
  }

  /*
  * Function used to capture canvas, used for generating PDF
  */
  generatePDF(){
      //create a new document
      // Default export is a4 paper, portrait, using milimeters for units
      var doc = new jsPDF();

      html2canvas(document.querySelector("#personalSection")).then(canvas => {
        //capture #personalSection, add to document
        this.genPDF(doc,canvas,1);
        html2canvas(document.querySelector("#workSection")).then(canvas => {
          //capture #workSection, add to document
          this.genPDF(doc,canvas,2);
          html2canvas(document.querySelector("#educationSection")).then(canvas => {
            //capture #educationSection, add to document
            this.genPDF(doc,canvas,3);
            html2canvas(document.querySelector("#skillSection")).then(canvas => {
              //capture #skillSection, add to document
              this.genPDF(doc,canvas,4);
            });
          });
        });
      });
  }

  /*
  * Display element with colors, used to switch bg color
  */
  displayDrawer(){
    //get element
    var element = document.getElementById('colorPalette');
    //check if element is already hidden
    if (element.classList.contains('hidden')){
      //if it is, remove hidden class, this makes it visible
      element.classList.remove('hidden');
    }else{
      //if not, add hidden class
      element.classList.add('hidden');
    }
  }

  /*
  * Generate the pdf
  */
  genPDF(doc, canvas, page){
    //define needed variables
    //dataURL will hold png image, converted from canvas
    var dataURL = canvas.toDataURL("image/png");
    //define new image element
    var i = new Image();
    var factor;

    //on image load
    i.onload = function(){
      //calculate the factor
         factor = i.width / 190;
      //add image to the document
         doc.addImage(dataURL, 'PNG', 10, 10, 190, i.height / factor);
         //check if you should add a page
         if(page<4){
           //add page to the document
             doc.addPage('a4');
         }else{
           //at the end, save document as resume.pf
           doc.save('resume.pdf');
         }
    };
    //set src attribute of image
    i.src = dataURL;
  }

  /*
  * Render the component
  */
  render(){
    // check the state of loading
    if(this.state.loading){
      return (
        <div className="loader">
          <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }else{
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

          <span className="fa-stack fa-2x final-button three" onClick={this.props.edit}>
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
          </span>

          <span className="fa-stack fa-2x final-button two" onClick={this.displayDrawer.bind(this)} data-toggle="tooltip" data-placement="left" title="Change bg color">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-tint fa-stack-1x fa-inverse"></i>
          </span>

          <span className="fa-stack fa-2x final-button one" onClick={this.generatePDF.bind(this)} data-toggle="tooltip" data-placement="left" title="Download PDF">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-download fa-stack-1x fa-inverse"></i>
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
}

//export component
export default Profile;
