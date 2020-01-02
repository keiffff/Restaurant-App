/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, CircularProgress } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { AppHeader } from 'components/AppHeader';
import { RestaurantList } from 'components/RestaurantList';
import { RestarantFilterModal } from 'components/RestaurantFilterModal';
import { SearchForm } from 'components/SearchForm';
import { GetRestaurantsQuery } from 'types/graphql';

const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      totalCount
      perPage
      currentPage
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

const searchFormWrapperStyle = css({
  '> .MuiInput-root': {
    width: '100%',
  },
  marginBottom: 12,
});

const filterButtonWrapperStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const loadingContentWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: `8px 0 16px`,
});

const searchResultStyle = css({
  marginBottom: 8,
  '&:after': {
    content: '"件 表示中"',
  },
});

const searchResultTextStyle = css({
  margin: `0 4px`,
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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <AppHeader />
      <header css={headerStyle}>
        <div css={searchFormWrapperStyle}>
          <SearchForm />
        </div>
        <div css={filterButtonWrapperStyle}>
          <Button size="small" variant="contained" onClick={() => setModalOpen(true)}>
            絞り込む
            <ArrowRightIcon />
          </Button>
        </div>
        <RestarantFilterModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </header>
      <section css={pageSectionStyle}>
        {loading ? (
          <div css={loadingContentWrapperStyle}>
            <CircularProgress size={60} />
          </div>
        ) : null}
        {!error && data ? (
          <div>
            <div css={searchResultStyle}>
              <span css={searchResultTextStyle}>{data.restaurants.currentPage * data.restaurants.perPage}</span>/
              <span css={searchResultTextStyle}>{data.restaurants.totalCount}</span>
            </div>
            <RestaurantList restaurants={data.restaurants.restaurants} />
          </div>
        ) : null}
      </section>
      <footer css={pageFooterStyle}>&copy; 2020 Kei Fujikawa</footer>
    </div>
  );
};
