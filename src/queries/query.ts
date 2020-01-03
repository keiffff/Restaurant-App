import gql from 'graphql-tag';

export const GET_RESTAURANTS = gql`
  query getRestaurants(
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
