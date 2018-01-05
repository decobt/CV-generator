import React, { Component } from 'react';

class PersonalSection extends Component{
  /*
  * Function used to generate social media List Items
  * input: link, media title
  * output: li html code
  */
  generateListItem(data, title){
    //check if data(link) is not empty
    if(data!==""){
      return (
        <li><a href={data}><i className={'fa fa-' + title +'-square fa-3x'} aria-hidden="true"></i> </a></li>
      );
    }
  }

  /*
  * Function used to generate social media section
  * input: skills social data
  * output: html code
  */
  generateMedia(data){
    //define variable to hold the output
    var output = [];

    //check if skills have been changed
    if(data.change){
      //check if values are not empty strings by comparing the length of the string
      if(data.twitter.length > 0 || data.linkedin.length > 0 || data.youtube.length > 0 ||
         data.github.length > 0 || data.bitbucket.length > 0){
           //if the condition is met, push the output data
            output.push(
              <div className="text-center" style={{background:'#222', padding:'20px'}}>
                <ul className="socialMedia">
                    {this.generateListItem(data.twitter, 'twitter')}
                    {this.generateListItem(data.linkedin, 'linkedin')}
                    {this.generateListItem(data.youtube, 'youtube')}
                    {this.generateListItem(data.github, 'github')}
                    {this.generateListItem(data.bitbucket, 'bitbucket')}
                </ul>
              </div>
            );
      }
    }
    //return the output
    return output;
  }

  /*
  * Function used to generate the personal bio
  * input: personal data, skills data
  * output: html generated code
  */
  generateBio(data, about){
    //define a variable to hold the code
    var output = [];

    //check if data is set by checking if name is set
    if(data.name){
      //if it is, push some code to the output
      output.push(
        <div className="text-left" key="1">

        <h4>Hello, I am {data.name}</h4>
        <p>{about}</p>

         <br/>
         <div style={{marginBottom:"15px"}}><span className="yellow">Email</span><span className="grey">{data.email}</span></div>
         <div style={{marginBottom:"15px"}}><span className="yellow">Phone</span><span className="grey">{data.phone}</span></div>
         <div style={{marginBottom:"15px"}}><span className="yellow">Birthday</span><span className="grey">{data.birthday}</span></div>
         <div style={{marginBottom:"15px"}}><span className="yellow">Address</span><span className="grey">{data.address1}{' ' + data.address2}</span></div>
         </div>
      );
    }else{
      // else, display message that no info has been added
      output.push(
        <p key="2" className="text-center">You have not added any personal information.</p>
      );
    }
    //return the output
    return output;
  }

  /*
  * Function used to generate the photo placeholder
  * input: image data
  * output: img html
  */
  generateImage(data){
    //define a variable to hold the output
    var output = [];

    //check if image is set
    if(data.image){
      //if it is, output the image
      output.push(
        <img key="1" alt={data.name} src={data.image} className="img-fluid" />
      );
    }else{
      //else output a placeholder for the image
      output.push(
        <img key="2" alt="Profile" src="http://via.placeholder.com/500x500?text=Profile+photo" className="img-fluid" />
      );
    }
    //return the output
    return output;
  }

  /*
  * Render the component
  */
  render(){
    //define some needed variables
    var personal = this.props.personal,
        skills = this.props.skills,
        media = this.generateMedia(skills.social),
        bio = this.generateBio(personal, skills.about),
        image = this.generateImage(personal);

    return (
      <div className="row" style={{marginBottom:'20px'}}>
        <div className="col-sm-4">
          {image}
          {media}
        </div>
        <div className="col-sm-8">
          <div style={{background:'#f1f1f1', padding:'20px'}}>
            <div className="header text-center">
              <span className="fa-stack fa-3x">
                <i className="fa fa-circle-thin fa-stack-2x"></i>
                <i className="fa fa-user fa-stack-1x"></i>
              </span>
              <h5>Personal Info</h5>
            </div>
          </div>
          <div style={{background:'#f9f9f9', padding:'20px'}}>
            {bio}
          </div>
        </div>
      </div>
    );
  }
}

//export the component
export default PersonalSection;
