const { AuthenticationError } = require('apollo-server-express');
const { User, Plant } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id }).populate('savedPlants');
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		savePlant: async (parent, args, context) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: context.user._id },
				{ $addToSet: { savedPlants: { ...args } } }
			)
			return updatedUser;
		},
		removePlant: async (parent, { plantId }, context) => {
			const updatedUser = await user.findOneAndUpdate(
				{ _id: context.user._id },
				{ $pull: { savedPlants: { plantId: plantId } } }
			)
		}

	}
}
module.exports = resolvers;