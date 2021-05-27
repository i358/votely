import React, { Component } from "react";
 // eslint-disable-next-line

export default class Badge extends Component {
  render() {
    const style = this.props.Style || {};
    if (this.props.Icon) {
      return (
        <h4 style={style} className="badge">
          {this.props.Icon} &nbsp; {this.props.Content}{" "}
        </h4>
      );
    } else {
      return (
        <h4 style={style} className="badge">
          {this.props.Content}{" "}
        </h4>
      );
    }
  }
}
