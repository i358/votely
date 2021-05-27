import React, { Component } from 'react'

export default class ToggleButtons extends Component {
    render() {
        const style = this.props.Style || {}
        return (
          <div className="toggleButtons" style={style}>
            <button
              className="btn1"
              onClick={this.props.Content.Button1.Onclick}
            >
              {this.props.Content.Button1.Content}
            </button>
            <button
              className="btn2"
              onClick={this.props.Content.Button2.Onclick}
            >
              {this.props.Content.Button2.Content}
            </button>
          </div>
        ); 
    }
}
