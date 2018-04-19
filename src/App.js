import React, { Component } from 'react';
import Affix from './views/components/affix'
import './index.css'
import './style/index.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>123</p>
        <Affix>
          <button className="ant-btn ant-btn-primary">固定在顶部</button>
        </Affix>
      </div>
    );
  }
}

export default App;
