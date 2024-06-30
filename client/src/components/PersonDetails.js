import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card } from 'antd';
import { PERSON_WITH_CARS } from '../graphql/queries';
import Cars from './lists/Cars';

const PersonDetails = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(PERSON_WITH_CARS, {
    variables: { id }
  });

  useEffect(() => {
    refetch({ id });
  }, [id, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { personWithCars } = data;

  if (!personWithCars) return <p>Person not found.</p>;

  return (
    <Card
      title={`${personWithCars.firstName} ${personWithCars.lastName}`}
      extra={<Link to="/">Go Back Home</Link>}
      style={{ width: '100%' }}
    >
      <Cars cars={personWithCars.cars} />
    </Card>
  );
};

export default PersonDetails;
