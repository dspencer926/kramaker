import React, { Component } from 'react';
import images from './Images.js';

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    }

    this.loadPic = this.loadPic.bind(this);
    let teeth;
  }

  componentDidMount() {
    console.log(images.kramerTeethImg)
    this.teeth = images.kramerTeethImg;
    this.teeth.height = 200;
    this.teeth.width = 200;
    let image = [this.teeth]
    this.setState({
      images: image,
    })
  }

  loadPic() {
    let file = document.getElementById('upload');
    this.props.getImage(file.files[0]);
  }

  render() {
    return (
      <div id='image-list'>
        {this.state.images.map(val => {
          return (
            <img 
              src={val.src} 
              height={val.height}
              width={val.width}
              onClick={(e)=> {this.props.addPic(e)}}
            />);
        })}
      </div>
    );
  }
}

export default ImageList;
