import React from 'react';
import './App.css';
import { Row, Col } from 'antd';
import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={8}>
          <Sidebar/>
        </Col>
        <Col span={16}>
          body comes here
        </Col>
      </Row>
    </div>
  );
}

export default App;
