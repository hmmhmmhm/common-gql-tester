const logger = require('../logger')

/**
 * @description Invoke Project Service Files
 */
module.exports = Sequence(({resolve, reject, data})=>{

    try{
        const serviceFilePath = `${process.cwd()}/dist/service/index.js`
        let {TesterOption, Init} = require(serviceFilePath)
        data.serviceTesterOption = TesterOption
        data.serviceInit = Init

        /**
         * @exception
         * Don't Try Service Test
         * It's Fine, keep going..
         */
        if(!data.serviceTesterOption.isNeedTestInit){
            resolve()
            return
        }

        logger.debug(`🦄  Detected service initialize sqeuence`, {noWrite: false})
        logger.debug(`🚧  Pre-initializing... ${serviceFilePath}\n`, {noWrite: false})

        try{
            Init({callback: (isInitSuccess)=>{

                /**
                 * @exception
                 * Microservice has Crashed
                 * It's not Fine, blow up everthing..
                 */
                if(!isInitSuccess) {
                    logger.debug(`🚧  Initialize sequence has been failed...`, {noWrite: false})
                    reject()
                    return
                }
    
                logger.debug(`🦄  Service initialize sequence has been completed.`, {noWrite: false})
                resolve()
            }})
        }catch(e){

            /**
             * @exception
             * Microservice has Crashed
             * And Didn't Catch Their Errors.
             * It's really not Fine, blow up everthing..
             */
            logger.debug(`🚧  Initialize sequence has been failed...`, {noWrite: false})
            logger.debug(`🚧  Tester found some unhandled errors:`, {noWrite: false})
            console.log(e)
            reject()
        }

    }catch(e){

        /**
         * @exception
         * No Service Test
         * It's Fine, keep going..
         */
        resolve()
    }
    
})