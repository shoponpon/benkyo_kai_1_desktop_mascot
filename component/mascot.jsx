import React from 'react';
import PropTypes from 'prop-types';
import * as fs from 'fs';
import * as path from 'path';
import { ipcRenderer } from 'electron';

export default class Mascot extends React.Component {
    
    componentDidMount(){
        
        this.userInterface = new UserInterfaceManager();
        this.sprite = new Image();
        this.sprite.src = this.props.image;
        this.drawMascot();
    }

    drawMascot(){
        const { canvas } = this.refs;
        const context = canvas.getContext('2d');
        context.clearRect(0,0,this.props.width,this.props.height);
        context.drawImage(this.sprite, 0, 0, this.props.width, this.props.height);
        setTimeout(this.drawMascot.bind(this),1/this.props.fps*1000);
    }

    render() {
        return <canvas ref='canvas' width={this.props.width} height={this.props.height}></canvas>;
    }
}

Mascot.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fps: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

class UserInterfaceManager{
    constructor(){
        this.isRightClicked = false;
        this.isDragging = false;
        this.dragX = 0;
        this.dragY = 0;
        window.addEventListener("mousedown",function(e){
            if(!this.isRightClicked){
                this.isDragging = true;
            }
        },false);
        window.addEventListener("mousemove",function(e){
            if(this.isDragging){
                let positionOfWindow = {
                    x : (typeof window.screenX !== "undefined") ? window.screenX : window.screenLeft,
                    y : (typeof window.screenY !== "undefined") ? window.screenY : window.screenTop
                }
                ipcRenderer.send("moveWindow",positionOfWindow.x + e.movementX,positionOfWindow.y + e.movementY);
                this.dragX = e.movementX;
                this.dragY = e.movementY;
            }
        },false);
        window.addEventListener("mouseup",function(e){
            this.isRightClicked = false;
            this.isDragging = false;
        },false);
        window.addEventListener("contextmenu",function(e){
            e.preventDefault();
            this.isRightClicked = true;
        });
    }
}