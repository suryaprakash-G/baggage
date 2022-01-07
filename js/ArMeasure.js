'use strict';

import React, { Component } from 'react';

import { StyleSheet } from "react-native";

import {
  ViroARPlaneSelector,
  ViroBox,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
} from 'react-viro';

var x_1=0;
var y_1=0;
var z_1=0;
var x_rot_1=0;
var y_rot_1=0;
var z_rot_1=0;
var x_scl_1=0.3;
var y_scl_1=0.3;
var z_scl_1=0.3;
export default class ArMeasure extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      box_color:"breeze_blue"
    };
    this.selctplane=this.selctplane.bind(this);
    this.dragobj=this.dragobj.bind(this);
    this.changebox=this.changebox.bind(this);
    console.log("started");
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    
  }
  changebox(){
    if(this.state.box_color=="red"){
    this.setState({box_color:"breeze_blue"})
    }
    else{
    this.setState({box_color:"red"})
    }
  }
  selctplane(){
    console.log("plane selected");
  }
  dragobj(e){
    console.log("dragged");
    console.log(e);
//    this.setState({"update":"true"});
    x_1=e[0];
    y_1=e[1];
    z_1=e[2];
    this.changebox
  }
  render() {
    ViroMaterials.createMaterials({
      white:{
        lightingModel:'Blinn',
        diffuseColor:'rgb(231,231,231)'
      }
    });
    ViroMaterials.createMaterials({
      red:{
        lightingModel:'Blinn',
        diffuseColor:'rgb(231,30,30)'
      }
    });
    ViroMaterials.createMaterials({
      breeze_blue: {
         lightingModel: "Blinn",
         diffuseColor:"rgb(0,153,204)",
       },
    });

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARPlaneSelector minHeight={.5} minWidth={.5} alignment={"HorizontalUpward" } onAnchorFound={this.selctplane} >
        <ViroNode
       
          position={[x_1, y_1, z_1]}
          rotation={[0, 0, 0]}
          scale={[1.0, 1.0, 1.0]}
            >
          <Viro3DObject source={require('./res/arrow.obj')}
           rotation={[0,180,0]}
           scale={[.005, .005, .005]}
          position={[x_1, y_1, z_1-0.5]}
           materials={["breeze_blue"]}
           type="OBJ"
          />
          <ViroText text={"0.7 M"} scale={[.5, .5, .5]} position={[-1, 0, 0]} style={styles.helloWorldTextStyle} />
         <Viro3DObject  
          onDrag={this.dragobj}
          dragType='FixedToWorld' dragPlane={{
            planePoint: [0,0,0],
            planeNormal: [0, 0, 0],
            maxDistance: 1
          }}

          onClick={this.changebox} 
           opacity={0.5}
           source={require('./res/baggage.obj')}
           resources={[require('./res/arrow.mtl')]}
           rotation={[0,0,0]}
           scale={[x_scl_1, y_scl_1, z_scl_1]}
           position={[x_1, y_1, z_1]}
           materials={[this.state.box_color]}
           type="OBJ"
          />
          </ViroNode>
          <ViroText text={"Place your Bag here"} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          
        </ViroARPlaneSelector>
      </ViroARScene>
    );
    
  }

  _onInitialized(state, reason) {

    this.setState({box_color:"breeze_blue"})
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#FBFBFB',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ArMeasure;
