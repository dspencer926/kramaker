import React, { Component } from 'react';
import Buttons from './components/Buttons.js';
import Canvas from './components/Canvas.js';
import DraggableImage from './components/DraggableImage.js';
import ImageList from './components/ImageList.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      draggableImage: null,
    }
    this.getImage = this.getImage.bind(this);
    this.setImage = this.setImage.bind(this);
    this.addPic = this.addPic.bind(this);
  }

  getImage(image) {
    var reader = new FileReader();
    reader.onload = this.setImage;
    reader.readAsDataURL(image);
  }
  
  setImage(e) {
    let img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      this.setState({
        image: img,
      }, this.canvas.drawImage)
    }
  }

  addPic(e) {
    let mainImg = this.state.image;
    let newImg = new DraggableImage(e.target, mainImg);
    this.setState({
      draggableImage: newImg,
    }, this.canvas.refresh)
  }

  render() {
    return (
      <div className="App">
        <Canvas 
          image={this.state.image}
          draggableImage={this.state.draggableImage}
          ref={instance => this.canvas = instance}
        />
        <Buttons getImage={this.getImage}/>
        {this.state.image && <ImageList addPic={this.addPic}/>}
      </div>
    );
  }
}

export default App;
