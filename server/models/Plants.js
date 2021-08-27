const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedPlants` array in User.js
const plantsSchema = new Schema({
	plantId: {
		type: String,
		required: true
	},
	name: {
			type: String
	},
	description: {
		type: String,
		required: true
	},
	// saved plant id from ("need to put where to get the plants here.")
	// image: {
	// 	type: String
	// },
	// link: {
	// 	type: String
	// },
	sun: {
		type: String,
		required: true
	},
	soil: {
		type: String,
		required: true
	}
});

module.exports = plantsSchema;
