import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FilterInput = {
  currentPage?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  range?: Maybe<Scalars['Int']>;
  freeword?: Maybe<Scalars['String']>;
  lunch?: Maybe<Scalars['Int']>;
  bottomLessCup?: Maybe<Scalars['Int']>;
  buffet?: Maybe<Scalars['Int']>;
  privateRoom?: Maybe<Scalars['Int']>;
  webReserve?: Maybe<Scalars['Int']>;
};

export type GetRestaurantsResponse = {
  __typename?: 'GetRestaurantsResponse';
  totalCount: Scalars['Int'];
  perPage: Scalars['Int'];
  currentPage: Scalars['Int'];
  restaurants: Array<Restaurant>;
};

export type Query = {
  __typename?: 'Query';
  restaurants: GetRestaurantsResponse;
};

export type QueryRestaurantsArgs = {
  input?: Maybe<FilterInput>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  name: Scalars['String'];
  image: Scalars['String'];
  openTime: Scalars['String'];
  nearStation: Scalars['String'];
  lunch?: Maybe<Scalars['Int']>;
  budget?: Maybe<Scalars['Int']>;
};

export type GetRestaurantsQueryVariables = {};

export type GetRestaurantsQuery = { __typename?: 'Query' } & {
  restaurants: { __typename?: 'GetRestaurantsResponse' } & Pick<
    GetRestaurantsResponse,
    'totalCount' | 'perPage' | 'currentPage'
  > & {
      restaurants: Array<
        { __typename?: 'Restaurant' } & Pick<
          Restaurant,
          'id' | 'name' | 'image' | 'openTime' | 'nearStation' | 'budget'
        >
      >;
    };
};

export const GetRestaurantsDocument = gql`
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

/**
 * __useGetRestaurantsQuery__
 *
 * To run a query within a React component, call `useGetRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRestaurantsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(
    GetRestaurantsDocument,
    baseOptions,
  );
}
export function useGetRestaurantsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(
    GetRestaurantsDocument,
    baseOptions,
  );
}
export type GetRestaurantsQueryHookResult = ReturnType<typeof useGetRestaurantsQuery>;
export type GetRestaurantsLazyQueryHookResult = ReturnType<typeof useGetRestaurantsLazyQuery>;
export type GetRestaurantsQueryResult = ApolloReactCommon.QueryResult<
  GetRestaurantsQuery,
  GetRestaurantsQueryVariables
>;
