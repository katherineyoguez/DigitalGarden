const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		plantCount: Int
		savedPlant: [Plant]
	}

	type Plant {
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
		savePlant(plantId: String!): User
		removePlant(plantId: String!): User
	}
`;

module.exports = typeDefs;
