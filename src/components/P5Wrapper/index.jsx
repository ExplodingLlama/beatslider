import React, { Component } from "react";

import beatsketch from "./beatsketch";

export default class P5Wrapper extends Component {
  componentDidMount() {
    this.canvas = new window.p5(beatsketch, "canvas-container");
    this.canvas.props = this.props.p5Props;
    this.canvas.onSetAppState = this.props.onSetAppState;
  }

  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props;
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return (
      <div
        id="canvas-container"
        style={{ width: "100%", textAlign: "center" }}
      />
    );
  }
}
