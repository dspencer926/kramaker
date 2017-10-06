import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.loadPic = this.loadPic.bind(this);
  }

  loadPic() {
    let file = document.getElementById('upload');
    if (file.files.length > 0) {
      this.props.getImage(file.files[0]);
      file.value = null;
    }
  }

  render() {
    return (
      <div id='buttons'>
        <input id='upload' type='file' accept='image'/>
        <button onClick={this.loadPic}>Okay</button>
      </div>
    );
  }
}

export default Buttons;
