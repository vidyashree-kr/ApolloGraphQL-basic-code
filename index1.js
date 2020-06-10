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
type Mutation {
    addBook(title: String,author: String): Book
  }
type Query{
    books:[Book!]!
    authors:[Author]
}
`

const books = [
    {
        title:"Hello World",
        author:{
            name:"Vidya"
        }
    }
]
const resolvers = {
    Query: {
        books: () => books
    },
    Mutation: {
        addBook: (parent, args) => {
            const book = {
                title: args.title,
                author: 
                {
                    name:args.author
                }
            }
            books.push(book)
            return book
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
    console.log(`server started at port ${url}`)
})