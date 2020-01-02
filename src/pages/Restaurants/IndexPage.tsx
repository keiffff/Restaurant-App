/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Input, InputAdornment, Select } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { AppHeader } from 'components/AppHeader';
import { RestaurantList } from 'components/RestaurantList';
import { GetRestaurantsQuery } from 'types/graphql';

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

const headerStyle = css({
  padding: 16,
  background: 'white',
});

const searchFormStyle = css({
  display: 'block',
  '> .MuiInput-root': {
    width: '100%',
  },
  marginBottom: 8,
});

const rangeSelectStyle = css({
  '&:before': {
    content: '"ここから"',
  },
  '&:after': {
    content: '"m 以内"',
  },
});

const loadingContentWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: `8px 0 16px`,
});

const pageFooterStyle = css({
  background: 'white',
  textAlign: 'center',
  padding: 16,
  color: '#808080',
  fontSize: 14,
});

export const RestaurantsIndexPage = () => {
  const { loading, error, data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);

  return (
    <div>
      <AppHeader />
      <header css={headerStyle}>
        <div css={searchFormStyle}>
          <Input
            placeholder="キーワードで検索..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </div>
        <div css={rangeSelectStyle}>
          <Select />
        </div>
      </header>
      <section css={pageSectionStyle}>
        {loading ? (
          <div css={loadingContentWrapperStyle}>
            <CircularProgress size={60} />
          </div>
        ) : null}
        {!error && data ? <RestaurantList restaurants={data.restaurants.restaurants} /> : null}
      </section>
      <footer css={pageFooterStyle}>&copy; 2020 Kei Fujikawa</footer>
    </div>
  );
};
