import React, {Component} from 'react'
import {Link} from 'react-router';
import {findDOMNode} from "react-dom"

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loc: window.location.pathname
    }
  }

  pageTransitionHandleClick() {
    this.setState({
      loc: window.location.pathname
    });
  }

  render() {
    return (
      <div className="layout__navigation">
        <nav className="layout__navigation--wrapper">
          <ul className="menu">
            <li><a href="#info">Information</a></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation