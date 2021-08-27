const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		plantCount: Int
		savedPlants: [Plant]
	}

	type Plants {
		plantId: String
		description: String
		title: String
		
	}

	input PlantInput {
		plantId: String
		description: String
		title: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		savePlant(plantBody: plantInput!): User
		removePlant(plantId: String!): User
	}
`;

module.exports = typeDefs;
