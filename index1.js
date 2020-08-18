const { ApolloServer, gql } = require("apollo-server")

const typeDefs = gql`
type Book{
    title:String
    author:Author
}
type Author{
    name:String
    books:[Book]
}
input booksInput{
    title: String
    author: String
}
type Mutation {
    addBook(input:booksInput): Book
  }
  type booksPayload{
    books:[Book!]!
  }
type Query{
    books:booksPayload
}

`

const booksData = [
    {
        title:"Pride and Prejudice",
        author:{
            name:"Jane Austen"
        }
    },
    {
        title:"The Red and the Black ",
        author:{
            name:"Stendhal"
        }
    },
    {
        title:"The Brothers Karamazov ",
        author:{
            name:"Dostoevsky"
        }
    }
]
const resolvers = {
    Query: {
        books: () => {
            return {
                books: booksData,
            }
        }
    },
    Mutation: {
        addBook: (parent, {input}) => {
            const book = {
                title: input.title,
                author: 
                {
                    name:input.author
                }
            }
            booksData.push(book)
            return book
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(`server started at port ${url}`)
})
