#!/usr/bin/env node

// Load modules
const {Sequencer} = require('async-sequencer')
const logger = require('./logger')

logger.debug(`🦄  Common GQL Tester Running...`, {noWrite: false})

/**
 * @description
 * Sequence data from the tester is here.
 */
const testerData = {
    serviceTesterOption: undefined,
    serviceInit: undefined,

    typeDefs: undefined,
    resolvers: undefined
}

/**
 * @description
 * GraphQL Test Sequence
 */
Sequencer(
    [
        require('./sequence/invoke'),
        require('./sequence/collect'),
        require('./sequence/playground'),
    ],

    ({sequenceNumber,
    isSequenceSuccess,
    isEndOfSequence})=>{

        if(!isSequenceSuccess){
            logger.debug(`🚧  Common-GQL Sequence #${sequenceNumber} has been failed.`, {noWrite: false})
            logger.debug(`🚧  Common-GQL-Tester Will be shudown...`, {noWrite: false})
            process.exit(0)
            return
        }

        if(isEndOfSequence) logger.debug(`🦄  All test sequences were successful.`, {noWrite: false})
    },

testerData)