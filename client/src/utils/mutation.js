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

export const SAVE_LISTS = gql`
  mutation saveLists($listsData: listsInput!) {
    saveLists(listsData: $listsData) {
      _id
      username
      email
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
export const REMOVE_LISTS = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
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
