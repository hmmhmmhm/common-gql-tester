const logger = require('../logger')

/**
 * @description Collecting Project GQL Data
 */
module.exports = Sequence(({resolve, reject, data})=>{

    let typeDefs, resolvers
    try{
        ({typeDefs, resolvers} = require(`${process.cwd()}/dist/graphql/index.js`))
        logger.debug(`🦄  Detected typeDefs & Resolvers`, {noWrite: false})

        data.typeDefs = typeDefs
        data.resolvers = resolvers

        resolve()

    }catch(e){

        /**
         * @exception
         * No Project File
         */
        logger.debug(`🚧   Are you sure there's a runnable project file here?`, {noWrite: false})
        logger.debug(`🚧  Import dist/graphql/index.js has failed.`, {noWrite: false})
        console.log(e)

        reject()
    }
})