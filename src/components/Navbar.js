import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    const classNormalizer = (x, y) => {
      if (x === "navbar-brand") {
        return `${x} ${y}`;
      } else {
        return `${y}`;
      }
    };
    return (
      <a
        style={this.props.Style || {}}
        href={this.props.To}
        className={
          this.props.Active
            ? classNormalizer(this.props.Role, "navbar-item active")
            : classNormalizer(this.props.Role, "navbar-item")
        }
      >
        {this.props.Content}
      </a>
    );
  }
}
