import React, { Component } from 'react';
import Buttons from './components/Buttons.js';
import Canvas from './components/Canvas.js';
import DraggableImage from './components/DraggableImage.js';
import ImageList from './components/ImageList.js';
import DownloadScreen from './components/DownloadScreen.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      draggableImage: null,
      downloadScreen: false,
      finishedCanvas: null,
    }
    this.getImage = this.getImage.bind(this);
    this.setImage = this.setImage.bind(this);
    this.addPic = this.addPic.bind(this);
    this.downloadLink = this.downloadLink.bind(this);
    this.downloadX = this.downloadX.bind(this);
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

  downloadLink() {
    this.setState({
      downloadScreen: true,
      finishedCanvas: this.canvas.canv.toDataURL(),
    })
  }

  downloadX() {
    this.setState({
      downloadScreen: false,
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.downloadScreen && 
          <DownloadScreen 
            image={this.state.finishedCanvas}
            downloadX={this.downloadX}
          />}
        <div id='canvas-and-list'>
          <button 
            id='download-button'
            onClick={this.downloadLink}
            className={this.state.draggableImage ? null : 'hidden'}
          >Download</button>
          <Canvas 
            image={this.state.image}
            draggableImage={this.state.draggableImage}
            ref={instance => this.canvas = instance}
          />
          {this.state.image && <ImageList addPic={this.addPic}/>}
        </div>
        <Buttons getImage={this.getImage}/>
      </div>
    );
  }
}

export default App;
