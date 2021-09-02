import gql from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_PLANT = gql`
	mutation savePlant($plantData: plantInput!) {
		savePlant(plantData: $plantData) {
			_id
			savedPlants {
				plantId
				name
				description
				sun
				soil
			}
		}
	}
`;
export const REMOVE_PLANT = gql`
	mutation removePlant($plantId: String!) {
		removePlant(plantId: $plantId) {
			savedPlant {
				plantId
				name
				description
				sun
				soil
			}
		}
	}
`;
