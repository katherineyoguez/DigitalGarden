import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
	  listsCount
	savedLists {
		plantId
		name
		description
		sun
		soil
		}
	}
}
`;