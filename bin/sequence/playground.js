const {Sequence} = require('async-sequencer')
const logger = require('../logger')
const {openServer} = require('../../')

/**
 * @description Start GQL Playground Server
 */
module.exports = Sequence(({resolve, reject, data})=>{

    try{
        const callback = (isSuccess, expressInstance, expressListener)=>{

            /**
             * @exception
             * Express Error
             */
            if(!isSuccess){
                logger.debug(`🔥  Error executing Express server.`, {noWrite: false})
                resolve()
            }

            logger.debug(`🚧  GraphQL Playground Sever started with port ${expressListener.address().port}.`, {noWrite: true})
            logger.debug(`🚧  Playground Link: http://localhost:${expressListener.address().port}`, {noWrite: true})
            resolve()
        }

        openServer({
            typeDefs: data.typeDefs, 
            resolvers: data.resolvers,
            callback
        })

    }catch(e){

        /**
         * @exception
         * GraphQL Error
         */
        logger.debug(`🔥  Error executing Apollo GraphQL server.`, {noWrite: false})
        console.log(e)
        reject()
    }
})