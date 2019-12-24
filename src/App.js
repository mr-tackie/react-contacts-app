import React from 'react';
import './App.css';
import { Row, Col, Empty } from 'antd';
import Sidebar from './components/sidebar/sidebar';
import ContactArea from './components/contact-area/contact-area';

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={8}>
          <Sidebar/>
        </Col>
        <Col span={16}>
          <ContactArea/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
