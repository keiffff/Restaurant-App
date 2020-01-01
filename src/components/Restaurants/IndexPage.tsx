/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AppHeader } from '../AppHeader';
import { GetRestaurantsQuery } from '../../types/graphql';

const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      id
      name
      image
    }
  }
`;

const restaurantsWrapperStyle = css({
  padding: `16px 8px 16px`,
});

const restaurantStyle = css({
  '& + &': {
    marginTop: 16,
  },
});

const mediaStyle = css({
  height: 160,
});

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
      <div css={restaurantsWrapperStyle}>
        {data?.restaurants.map(r => (
          <Card key={r.id} css={restaurantStyle}>
            <CardMedia css={mediaStyle} component="img" image={r.image} title={r.name} />
            <CardContent>
              <span>{r.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
