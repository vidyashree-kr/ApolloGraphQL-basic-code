import React, { Component } from 'react';
import './App.css';
import Book from './Book';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

export default class App extends Component {
  render() {
    return ( 
        <ApolloProvider client={client}>
      <Book client={client}/>
      </ApolloProvider>
    );
  }
}
const client = new ApolloClient({
   link: new HttpLink({ uri: 'http://localhost:4000/' }),
  cache: new InMemoryCache().restore({}),
});

