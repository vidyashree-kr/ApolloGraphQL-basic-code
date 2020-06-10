import React from "react";
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';

const BOOKAPI = gql`
  query{
    books{
      title
      author{
        name
      }
    }
  }
  `
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author{
        name
      }
    }
  }
`
export default class Book extends React.Component{

  async componentDidMount(){
    const { client } = this.props
    try {
      const data = await client.query({
        query: BOOKAPI
      })
      console.log('query', data)
    } catch (e) {
      console.log('error', e.message)
    }
  }
  handleAPI = (e,addBook) => {
    e.preventDefault()
    console.log('calling api')
    addBook({
      variables: {
        title: "hello graphql",
        author: "vidya"
      }
    });
  }
  render(){
    return(
      <div>
         <Mutation mutation={ADD_BOOK} 
        onCompleted={ data => console.log(data)}
        onError={ e => console.log(e.message)}>
          {addBook => (
            <div>
              <button
                onClick={e => {
                 this.handleAPI(e,addBook)
                }}
              >
              ADD
              </button>
            </div>
          )}
        </Mutation>
      </div>
    )
  }
}