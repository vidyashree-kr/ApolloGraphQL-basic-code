const { ApolloServer, gql,IResolverObject } = require('apollo-server');
const fetch = require('node-fetch')
const getRandomUserDataSource=require('./getRandomUserDataSource')

const typeDefs = gql`
type Person {
  gender: String
  email: String
  phone: String
}
  type Query {
    randomPerson :[Person]
    randomPerson2 :[Person]
  }
`;
const resolvers = {
  Query: {
    randomPerson: async() => {
      const response  = await fetch('https://api.randomuser.me/');
      const data = await response.json();
      // console.log(data)
      return data.results;
    },
      randomPerson2: async(root, requestData, { dataSources }) => {
      const data=await dataSources.getRandomUserDataSource.getData(requestData)
      return await data
    }
  }, 
};
const server = new ApolloServer({ typeDefs, resolvers ,
  dataSources: () =>{
    return{
      getRandomUserDataSource:new getRandomUserDataSource()
    }
  }
});
server.listen().then(({ url }) => {
  console.log(`??  Server ready at ${url}`);
});