/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AppHeader } from '../../components/AppHeader';
import { RestaurantList } from '../../components/RestaurantList';
import { GetRestaurantsQuery } from '../../types/graphql';

const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      restaurants {
        id
        name
        image
        openTime
        nearStation
        budget
      }
    }
  }
`;

export const RestaurantsIndexPage = () => {
  const { loading, error, data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <AppHeader />
      <RestaurantList restaurants={data.restaurants.restaurants} />
    </div>
  );
};
