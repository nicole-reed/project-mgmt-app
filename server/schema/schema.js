
// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        // Add relationship to different resources in this case the ClientType
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(client => client.id === parent.clientId)
            }
        }
    })
});

// To make a query (ie get single client by id)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // each field will pertain to queries (ie client will most likely be to fetch a client)
        client: {
            type: ClientType,
            // args needed to make our query
            args: { id: { type: GraphQLID } },
            // what we want to respond with
            resolve(parent, args) {
                return Client.findById(args.id)
            }

        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id)
            }

        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        }
    }
});

// 

// Export the schema so we can make requests
module.exports = new GraphQLSchema({
    query: RootQuery
});