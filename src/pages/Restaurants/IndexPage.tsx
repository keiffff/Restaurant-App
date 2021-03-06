/** @jsx jsx */
import { useReducer, useState, useCallback, useMemo, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, CircularProgress } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { AppHeader } from 'components/AppHeader';
import { RestaurantList } from 'components/RestaurantList';
import { RestarantFilterModal } from 'containers/RestaurantFilterModal';
import { SearchForm } from 'components/SearchForm';
import { FilterState, FilterAction, FilterRestaurantContext } from 'contexts/filterRestaurant';
import { useIntersectionObserver } from 'hooks/IntersectionObserver';
import { useGetRestaurantsQuery } from 'types/graphql';

const initialFilterState: FilterState = {
  range: null,
  query: '',
  lunch: false,
  bottomLessCup: false,
  buffet: false,
  privateRoom: false,
  webReserve: false,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'changeRange':
      return { ...state, range: action.payload };
    case 'changeQuery':
      return { ...state, query: action.payload };
    case 'toggleLunch':
      return { ...state, lunch: action.payload };
    case 'toggleBottomLessCup':
      return { ...state, bottomLessCup: action.payload };
    case 'toggleBuffet':
      return { ...state, buffet: action.payload };
    case 'toggleWebReserve':
      return { ...state, webReserve: action.payload };
    case 'togglePrivateRoom':
      return { ...state, privateRoom: action.payload };
    default:
      return state;
  }
}

function mapBooleanToInt(value: boolean) {
  return value ? 1 : 0;
}

const pageSectionStyle = css({
  padding: `16px 8px 16px`,
});

const navigationStyle = css({
  padding: 16,
  background: 'white',
});

const searchFormWrapperStyle = css({
  marginBottom: 12,
});

const filterButtonWrapperStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const loadingContentWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
  padding: `16px 0 16px`,
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
  const { loading, error, data, refetch, fetchMore } = useGetRestaurantsQuery({ notifyOnNetworkStatusChange: true });
  const targetRef = useRef<HTMLDivElement>(null);
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [modalOpen, setModalOpen] = useState(false);
  const hasMoreResult = useMemo(() => {
    if (!data) return false;
    const { totalCount, perPage, currentPage } = data.restaurants.pageInfo;

    return currentPage * perPage < totalCount;
  }, [data]);
  const handleChangeQuery = useCallback((value: string) => filterDispatch({ type: 'changeQuery', payload: value }), [
    filterDispatch,
  ]);
  const handleSubmit = useCallback(
    (value: FilterState, location?: { latitude: number; longitude: number }) =>
      refetch({
        ...(value.range && location ? { range: value.range } : {}),
        freeword: value.query,
        lunch: mapBooleanToInt(value.lunch),
        bottomLessCup: mapBooleanToInt(value.bottomLessCup),
        buffet: mapBooleanToInt(value.buffet),
        webReserve: mapBooleanToInt(value.webReserve),
        privateRoom: mapBooleanToInt(value.privateRoom),
        ...(value.range && location ? { latitude: location.latitude, longitude: location.longitude } : {}),
      }),
    [refetch],
  );
  const handleInterSect = useCallback(() => {
    if (loading || !data || !hasMoreResult) return;
    fetchMore({
      variables: { offsetPage: data.restaurants.pageInfo.currentPage + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          restaurants: {
            __typename: 'GetRestaurantsResponse',
            restaurants: [...prev.restaurants.restaurants, ...fetchMoreResult.restaurants.restaurants],
            pageInfo: fetchMoreResult.restaurants.pageInfo,
          },
        };
      },
    });
  }, [data, fetchMore, hasMoreResult, loading]);
  useIntersectionObserver({ targetRef, onInterSect: handleInterSect });

  return (
    <div>
      <AppHeader />
      <FilterRestaurantContext.Provider value={{ filterState, filterDispatch }}>
        <nav css={navigationStyle}>
          <div css={searchFormWrapperStyle}>
            <SearchForm
              query={filterState.query}
              onChangeQuery={handleChangeQuery}
              onSubmit={() => handleSubmit(filterState)}
            />
          </div>
          <div css={filterButtonWrapperStyle}>
            <Button size="small" variant="contained" onClick={() => setModalOpen(true)}>
              絞り込む
              <ArrowRightIcon />
            </Button>
          </div>
          <RestarantFilterModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
        </nav>
        <section css={pageSectionStyle}>
          {!error && data ? (
            <div>
              <div css={searchResultStyle}>
                <span css={searchResultTextStyle}>
                  {hasMoreResult
                    ? data.restaurants.pageInfo.currentPage * data.restaurants.pageInfo.perPage
                    : data.restaurants.pageInfo.totalCount}
                </span>
                /<span css={searchResultTextStyle}>{data.restaurants.pageInfo.totalCount}</span>
              </div>
              <RestaurantList restaurants={data.restaurants.restaurants} />
              <div ref={targetRef} />
            </div>
          ) : null}
          {loading ? (
            <div css={loadingContentWrapperStyle}>
              <CircularProgress size={60} />
            </div>
          ) : null}
        </section>
        <footer css={pageFooterStyle}>&copy; 2020 Kei Fujikawa</footer>
      </FilterRestaurantContext.Provider>
    </div>
  );
};
