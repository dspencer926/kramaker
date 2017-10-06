import React, { Component } from 'react';
import images from './Images.js';

class ImageList extends Component {
  constructor(props) {
    super(props);

    this.loadPic = this.loadPic.bind(this);
    let teeth;
  }

  componentDidMount() {
    console.log(images.kramerTeethImg)
    this.teeth = images.kramerTeethImg;
  }

  loadPic() {
    let file = document.getElementById('upload');
    this.props.getImage(file.files[0]);
  }

  render() {
    return (
      <div id='image-list'>
        <img name='teeth' height='200' width='200' src='./kramerPics/kramerTeeth.png' onClick={(e)=> {this.props.addPic(e)}} />
      </div>
    );
  }
}

export default ImageList;
