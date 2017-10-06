import React, { Component } from 'react';

class DownloadScreen extends Component {
  constructor(props) {
    super(props);

    
  }



  render() {
    return (
      <div id='download-screen'>
        <div id='download-link-div'>
          <div 
            id='x-box'
            onClick={this.props.downloadX}
          > X </div>
          <a href={this.props.image} download> Download!! </a>
        </div>
      </div>
    );
  }
}

export default DownloadScreen;