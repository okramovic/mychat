import React, { Component } from 'react';

class FileUploadForm extends Component{
//class FileUploadForm extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
  return(
    <div id="uploadFileForm" className="full flex evenly"
         style={{display: this.props.display ? 'flex': 'none'}}>
      
      <form ref="some-random-text" onSubmit={ev=>this.props.fileSubmitHandler(ev)} 
             className="full flex evenly"
             style={{width:'100%'}}>
             <div onClick={this.props.openFileForm} className="icon" style={{}}>←</div>
             <input type="file" name="uploadFile" />
             <input type="submit" value="Upload!" />
      </form>
      
    </div>)
  }// <div></div>
  // action="http://snapdrop.glitch.me/api/uploadFile" method="post" enctype="multipart/form-data"
};

module.exports = FileUploadForm;