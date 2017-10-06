import React, { Component } from 'react';
import DraggableImage from './DraggableImage';


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDownCoords: {x: null, y: null},
      action: null,             //  move, resize, rotate, or [delete?]
      dragging: false,
      images: {},
      imageCount: 0,
    }
    this.refresh = this.refresh.bind(this);
    // this.addPic = this.addPic.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.drawImage = this.drawImage.bind(this);
    let original; 
    let canv;
  }
  
  drawImage() {
    this.canv = document.getElementById('canvas');
    console.log(this.canv);
    let ctx = this.canv.getContext('2d');
    this.original = this.props.image;
    ctx.drawImage(this.original, 0, 0);
  }

  refresh() {
    let ctx = this.canv.getContext('2d');
    ctx.drawImage(this.original, 0, 0);
    let canv = this.props.draggableImage.generate();
    ctx.drawImage(canv, 0, 0);
  }

  checkItems(x, y) {
    let instance = this.props.draggableImage
    if (this.withinBox(x, y, this.props.draggableImage)) instance = this.props.draggableImage 
    return instance;
  }

  withinBox(xp, yp, instance) {
    let c = instance.corners;
    let one = this.calc(c.nw.x, c.nw.y, c.ne.x, c.ne.y, xp, yp);
    let two = this.calc(c.ne.x, c.ne.y, c.se.x, c.se.y, xp, yp);
    let three = this.calc(c.se.x, c.se.y, c.sw.x, c.sw.y, xp, yp);
    let four = this.calc(c.sw.x, c.sw.y, c.nw.x, c.nw.y, xp, yp);
    if (one && two && three && four) return true;
    return false;
  }

  calc(x1, y1, x2, y2, xp, yp) {
    let A = -(y2 - y1);
    let B = x2 - x1;
    let C = - ((A * x1) + (B * y1));
    let D = (A * xp) + (B * yp) + C;
    let result = (D > 0)? true : false;
    return result;
  }

  handleMouseDown(e) {
    console.log('mousedown');
    let x = e.clientX - this.canv.offsetLeft;
    let y = e.clientY - this.canv.offsetTop;
    let image = this.checkItems(x, y);
    if (image) {
      let mode = this.props.draggableImage.mode(x, y);
      console.log(mode);
      let obj = {x: x, y: y}
      this.setState({
        action: mode,
        mouseDownCoords: obj,
      })
    }
  }

  handleMouseUp() {
    this.setState({
      action: null,
    });
  }

  handleMouseMove(e) {
    let mouseDownCoords = this.state.mouseDownCoords;
    let canv = document.getElementById('canvas');
    let ctx = canv.getContext('2d');
    let offsetX = e.clientX - canv.offsetLeft;
    let offsetY = e.clientY - canv.offsetTop;
    let mouseMovementX = offsetX - mouseDownCoords.x;
    let mouseMovementY = offsetY - mouseDownCoords.y;
    if (this.state.action) {
      let active = this.props.draggableImage;
      switch (this.state.action) {
        case 'move': {
          active.move(mouseMovementX, mouseMovementY)
          let currentCoords = {x: offsetX, y: offsetY}
          this.setState({
            mouseDownCoords: currentCoords,
          }, () => {this.refresh()})
        }
        break;
        case 'resize': {
          active.resize(mouseMovementX, mouseMovementY) // make function return canvas
          let canv = active.canv;
          let currentCoords = {x: offsetX, y: offsetY}
          this.setState({
            mouseDownCoords: currentCoords,
          }, () => {this.refresh()})
        }
          break;
        case 'rotate': {
          active.rotate(offsetX, offsetY);
          let canv = active.canv;
          let currentCoords = {x: offsetX, y: offsetY}
          this.setState({
            mouseDownCoords: currentCoords,
          }, () => {this.refresh()})
        }
      }
    }
  }

  // async addPic(e) {
  //   let zIndex = this.state.imageCount + 1;
  //   this.setState({
  //     imageCount: zIndex,
  //   })
  //   let name = e.target.id;
  //   let canv = document.getElementById('canvas');
  //   let newPic = new DraggableImage(name, e.target);
  //   newPic.location();
  //   let obj = this.state.images;
  //   obj[newPic.name] = newPic;
  //   obj[newPic.name].zIndex = zIndex;
  //   this.setState({
  //     images: obj,
  //   }, () => this.state.images[name].location())
  //   let ctx = canv.getContext('2d');
  //   newPic = await newPic.generate();
  //   console.log(newPic)
  //   ctx.drawImage(this.original, 0, 0);
  //   ctx.drawImage(newPic, 0, 0);
  // }


  render() {
    let display;
    if (this.props.image) {
      display = 
      <canvas 
        id='canvas' 
        height={this.props.image.height} 
        width={this.props.image.width}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={this.handleMouseUp}
        onMouseMove={(e) => this.handleMouseMove(e)}
      />
    } else {
      display = <p>Welcome to the Kramaker</p>
    }
    return (
      <div className='canvas-div'>
        {display}
      </div>
    );
  }
}

export default Canvas;
