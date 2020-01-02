/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
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

const pageSectionStyle = css({
  padding: `16px 8px 16px`,
});

const loadingContentWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: `8px 0 16px`,
});

export const RestaurantsIndexPage = () => {
  const { loading, error, data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);

  return (
    <div>
      <AppHeader />
      <section css={pageSectionStyle}>
        {loading ? (
          <div css={loadingContentWrapperStyle}>
            <CircularProgress size={60} />
          </div>
        ) : null}
        {!error && data ? <RestaurantList restaurants={data.restaurants.restaurants} /> : null}
      </section>
    </div>
  );
};
