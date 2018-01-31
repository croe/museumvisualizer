import React, {Component} from "react";
import {render} from "react-dom";
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import Navigation from './components/navigation';

import Index from './index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    let it = this;
  }

  componentDidMount(){
    let it = this;

  }

  render() {

    return (
      <div className="layout">
        <Navigation />
        {this.props.children && React.cloneElement(this.props.children, {
          _it: this
        })}
      </div>
    )
  }


}

render((
    <Router history={browserHistory}>
      <Route path="/" components={App}>
        <IndexRoute components={Index}/>
      </Route>
    </Router>
  ), document.getElementById('root')
);
