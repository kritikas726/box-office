/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../Components/show/ShowMainData';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import Cast from '../Components/show/Cast';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  if (isLoading) {
    return <div>Data is leing loaded.</div>;
  }
  if (isLoading) {
    return <div>Error occurred {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        summary={show.summary}
        tags={show.genres}
        rating={show.rating}
      />

      <InfoBlock>
        <h1>Details</h1>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h1>Seasons</h1>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h1>Cast</h1>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;