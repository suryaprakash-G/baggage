'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARPlaneSelector,
  ViroBox,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  Viro3DObject,
} from 'react-viro';

export default class ArMeasure extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };
    this.selctplane=this.selctplane.bind(this);
    this.dragobj=this.dragobj.bind(this);
    console.log("started");
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    
  }
  selctplane(){
    console.log("plane selected");
  }
  dragobj(){
    console.log("dragged");
  }
  render() {
    ViroMaterials.createMaterials({
      white:{
        lightingModel:'Blinn',
        diffuseColor:'rgb(231,231,231)'
      }
    });
    ViroMaterials.createMaterials({
      breeze_blue: {
         lightingModel: "Blinn",
         diffuseColor:"rgb(0,153,204)",
       },
    });
    var x_1=0;
    var y_1=0;
    var z_1=-1;
    var x_rot_1=0.5;
    var y_rot_1=0.5;
    var z_rot_1=0.5;

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARPlaneSelector minHeight={.5} minWidth={.5} onAnchorFound={this.selctplane} >
          <Viro3DObject onDrag={this.dragobj} source={require('./res/arrow.obj')}
           resources={[require('./res/arrow.mtl')]}
           position={[x_1, y_1, z_1]}
           rotation={[x_rot_1,y_rot_1,z_rot_1]}
           scale={[.3, .3, .3]}
           materials={["breeze_blue"]}
           type="OBJ"
          />
          <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
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
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ArMeasure;
