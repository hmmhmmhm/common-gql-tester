#!/usr/bin/env node

// Load modules
const FolderLogger = require('folder-logger')
const {openServer} = require('../index.js')
const logger = new FolderLogger(`${__dirname}`)

logger.debug(`🦄 Common GQL Tester Running...`, {noWrite: false})

/***
 * @description Collecting Project GQL Data
 */
let typeDefs, resolvers
try{
    ({typeDefs, resolvers} = require(`${process.cwd()}/dist/graphql/index.js`))
    logger.debug(`🦄 Detected typeDefs & Resolvers`, {noWrite: false})

}catch(e){
    logger.debug(`🚧 Are you sure there's a project file here?`, {noWrite: false})
    logger.debug(`🚧 /dist/graphql/index.js not found.`, {noWrite: false})
    process.exit(0)
}

/***
 * @description Start GQL Playground Server
 */
try{
    let callback = (isSuccess, expressInstance)=>{
        if(!isSuccess){
            logger.debug(`🔥  Error executing Express server.`, {noWrite: false})
            process.exit(0)
        }
        Logger.debug(`🚧  GraphQL Playground Sever started with port ${expressInstance.address().port}.`, {noWrite: true})
        Logger.debug(`🚧  Playground Link: http://localhost:${expressInstance.address().port}`, {noWrite: true})
    }
    openServer({typeDefs, resolvers})

}catch(e){
    logger.debug(`🔥  Error executing Apollo GraphQL server.`, {noWrite: false})
    console.log(e)
    process.exit(0)
}