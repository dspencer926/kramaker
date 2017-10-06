import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.loadPic = this.loadPic.bind(this);
  }

  loadPic() {
    let file = document.getElementById('upload');
    this.props.getImage(file.files[0]);

  }

  render() {
    return (
      <div id='buttons'>
        <canvas />
        <input id='upload' type='file' accept='image'/>
        <button onClick={this.loadPic}>Test</button>
      </div>
    );
  }
}

export default Buttons;
