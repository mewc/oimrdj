import React, { Component } from 'react';

import '../css/App.css';
import * as str from '../static/Strings';

import IntroCard from './IntroCard';
import MTP from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    
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
