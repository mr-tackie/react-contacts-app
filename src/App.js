import React from "react";
import "./App.css";
import { Row, Col } from "antd";
import Sidebar from "./components/sidebar/sidebar";
import ContactArea from "./components/contact-area/contact-area";
import SelectedContactContext from "./components/context/context-provider";
import ContactsContext from "./components/context/contacts-context-provider";

function App() {
  return (
    <ContactsContext>
      <SelectedContactContext>
        <div className="App">
          <Row>
            <Col span={6}>
              <Sidebar />
            </Col>
            <Col span={18}>
              <ContactArea />
            </Col>
          </Row>
        </div>
      </SelectedContactContext>
    </ContactsContext>
  );
}

export default App;
