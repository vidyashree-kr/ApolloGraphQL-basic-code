const { RESTDataSource } = require('apollo-datasource-rest');

 class getRandomUserDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.randomuser.me/';
  }
  async getData(requestData) {
    try{
      let URL=`https://api.randomuser.me/`
    const  data  = await this.get(URL);
    // console.log('random2 data',data)
    const {results}={...data}
     return await results
    }
    catch(e){
      console.log('random2 error',e.message)
      throw new ApolloError(e.message) 
    }
  }
}

module.exports = getRandomUserDataSource;