import { ApolloServer, gql } from 'apollo-server-koa'
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core'
import Koa from 'koa'
import http from 'http'
import CovidAPI from './covidApi'

const typeDefs = gql`
  type Overall {
    """
    全国疫情信息概览
    """
    generalRemark: String
    """
    注释内容，X为1~5
    """
    remark1: String
    remark2: String
    remark3: String
    remark4: String
    remark5: String
    """
    病毒名称
    """
    note1: String
    """
    传染源
    """
    note2: String
    """
    传播途径
    """
    note3: String
    """
    现存确诊人数（较昨日增加数量）
    值为confirmedCount(Incr) - curedCount(Incr) - deadCount(Incr)
    """
    currentConfirmedCount: String
    currentConfirmedIncr: String
    """
    累计确诊人数（较昨日增加数量）
    """
    confirmedCount: String
    confirmedIncr: String
    """
    疑似感染人数（较昨日增加数量）
    """
    suspectedCount: String
    suspectedIncr: String
    """
    治愈人数（较昨日增加数量）
    """
    curedCount: String
    curedIncr: String
    """
    死亡人数（较昨日增加数量）
    """
    deadCount: String
    deadIncr: String
    """
    重症病例人数（较昨日增加数量）
    """
    seriousCount: String
    seriousIncr: String
    """
    数据最后变动时间
    """
    updateTime: String
  }

  type Query {
    overall: [Overall]
  }
`

const resolvers = {
  Query: {
    async overall(_, __, { dataSources }) {
      return dataSources.covidAPI.getOverall()
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => ({
      covidAPI: new CovidAPI()
    })
  })
  await server.start()
  const app = new Koa()
  server.applyMiddleware({ app })
  httpServer.on('request', app.callback())
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer(typeDefs, resolvers)
