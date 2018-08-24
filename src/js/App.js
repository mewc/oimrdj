import React, { Component } from 'react';
import { FaCompactDisc } from 'react-icons/fa/';
import '../css/App.css';
import * as str from '../static/Strings';

import IntroCard from './IntroCard';
import MTP from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {

    constructor(props){
        super(props);

    }

  render() {
    return (
      <div className="App">
          <MTP>
              <IntroCard label={str.LABEL_LOGIN}/>

          </MTP>
      </div>
    );
  }
}

export default App;
