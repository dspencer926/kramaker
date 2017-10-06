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
    this.setState({
      images: images,
    })
  }

  loadPic() {
    let file = document.getElementById('upload');
    this.props.getImage(file.files[0]);
  }

  render() {
    return (
      <div id='image-list'>
        {this.state.images.map((val, i) => {
          return (
            <img 
              key={i} 
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
