import gql from 'graphql-tag';

export const GET_RESTAURANTS = gql`
  query getRestaurants(
    $offsetPage: Int
    $latitude: Float
    $longitude: Float
    $range: Int
    $freeword: String
    $lunch: Int
    $bottomLessCup: Int
    $buffet: Int
    $privateRoom: Int
    $webReserve: Int
  ) {
    restaurants(
      input: {
        offsetPage: $offsetPage
        latitude: $latitude
        longitude: $longitude
        range: $range
        freeword: $freeword
        lunch: $lunch
        bottomLessCup: $bottomLessCup
        buffet: $buffet
        privateRoom: $privateRoom
        webReserve: $webReserve
      }
    ) {
      restaurants {
        id
        name
        image
        openTime
        nearStation
        budget
      }
      pageInfo {
        totalCount
        perPage
        currentPage
      }
    }
  }
`;
