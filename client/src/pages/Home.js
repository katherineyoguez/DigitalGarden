import React from 'react';

import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_LISTS } from './utils/mutations';
import { removeListsId } from './utils/localStorage';
import Auth from '../utils/auth';
const SavedPlants = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removePlants] = useMutation(REMOVE_LISTS);
  const userData = data?.me || {};
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeletePlants = async (plantsId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removePlants({
        variables: { plantsId },
      });
      // upon success, remove plants's id from localStorage
      removeListsId();
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s plants!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPlants?.length
            ? `Viewing ${userData.savedPlants.length} saved ${
                userData.savedPlants.length === 1 ? 'plants' : 'plants'
              }:`
            : 'You have no saved plants!'}
        </h2>
        <CardColumns>
          {userData.savedPlants?.map((plants) => {
            return (
              <Card key={plants.plantsId} border="dark">
                {/* {plants.image ? (
                  <Card.Img
                    src={plants.image}
                    alt={`The cover for ${plants.title}`}
                    variant="top"
                  />
                ) : null} */}
                <Card.Body>
                  <Card.Title>{plants.title}</Card.Title>
                  <p className="small">Authors: {plants.name}</p>
                  <Card.Text>{plants.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePlants(plants.plantsId)}
                  >
                    Delete this plants!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default SavedPlants;


