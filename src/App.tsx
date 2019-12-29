import React, { useState } from "react";
import "./App.css";
import { Row, Col } from "antd";
import Sidebar from "./components/sidebar/sidebar";
import ContactArea from "./components/contact-area/contact-area";
import SelectedContactContext from "./components/context/context-provider";
import ContactsContext from "./components/context/contacts-context-provider";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAuth0 } from "./react-auth0-spa";
import {setContext} from "apollo-link-context";
import LandingPage from "./components/landing-page/landing-page";

function App() {
  
  const { isAuthenticated, loading, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  if(loading){
    return (<div>Loading...</div>)
  }

  const getAccessToken = async () => {
    try{
      const token = await getIdTokenClaims();
      setAccessToken(token.__raw);
    }catch(e){
      console.log(e);
    }
  }

  getAccessToken();


  const cache = new InMemoryCache();
  const link = new HttpLink({
    uri: "https://happy-contacts.herokuapp.com/v1/graphql"
  });

  const authLink = setContext((_, {headers}) => {
    const token = accessToken;
    if(token){
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    }else{
      return {
        headers : {
          ...headers
        }
      }
    }
  })

  const client = new ApolloClient({
    cache,
    link: authLink.concat(link)
  });

  if(!isAuthenticated){
    return <LandingPage/>
  }

  return (
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      )
}

export default App;
