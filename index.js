const { ApolloServer } = require('apollo-server-express')
const Express = require('express')

/**
 * @description Command function is implemented in the bin folder.
 */

export const  mockFunctionsToResolverMap = (resolverMap) =>{
    let mockFunctions = {}
    for (var key in resolverMap) {
        if (!resolverMap.hasOwnProperty(key)) continue
        mockFunctions[key] = resolverMap[key]()
    }
    return mockFunctions
}

export const openServer = ({typeDefs, resolvers, callback}) => {
    const apolloServer = new ApolloServer({
        typeDefs, 
        resolvers: mockFunctionsToResolverMap(resolvers),
        introspection: true,
        playground:  {
            settings: {
            'editor.theme': 'light'
            }
        }
    })

    const expressInstance = Express()
    apolloServer.applyMiddleware({
        path: "/",
        app: expressInstance
    })

    expressInstance.listen(0, () => {
        callback(true, expressInstance)

    }).on("error", (err) => {
        callback(false, expressInstance)
        console.log(err)
    })
}