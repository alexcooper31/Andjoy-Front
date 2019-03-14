import gql from 'graphql-tag';

export const QUERY_GAME_OBJECT_GET = gql`
  query gameObjectGet(
    $userId: String!,
    $gameId: Int!,
  ) {
    gameObjectGet(
      userId: $userId,
      gameId: $gameId,
    ) {
      userId
      gameId
      gameName
      isWanted
      isPlayed
      isFavorite
      userRating
      releaseDate
      platform
    }
  }
`;

export interface IGameObject {
  userId: string;
  gameId: number;
  gameName: string;
  isWanted: boolean;
  isPlayed: boolean;
  isFavorite: boolean;
  userRating: number;
  releaseDate: number;
  platform: string;
}

export interface IQueryGameObjGet {
  gameObjectGet: IGameObject;
}

export const QUERY_WANTED_LIST_GET = gql`
  query wantedListGet(
    $userId: String!,
    $filter: String,
    $order: Int,
    $platform: String,
  ) {
    wantedListGet(
      userId: $userId,
      filter: $filter,
      order: $order,
      platform: $platform,
    ) {
      gameId
      gameName
      releaseDate
      platform
    }
  }
`;

export interface IQueryWantedListGet {
  wantedListGet: IGameObject[];
}

export const QUERY_PLAYED_LIST_GET = gql`
  query playedListGet(
    $userId: String!,
    $filter: String,
    $order: Int,
    $platform: String,
  ) {
    playedListGet(
      userId: $userId,
      filter: $filter,
      order: $order,
      platform: $platform,
    ) {
      gameId
      gameName
      userRating
      platform
    }
  }
`;

export interface IQueryPlayedListGet {
  playedListGet: IGameObject[];
}

export const QUERY_FAVORITE_LIST_GET = gql`
  query favoriteListGet(
    $userId: String!,
    $filter: String,
    $order: Int,
    $platform: String,
  ) {
    favoriteListGet(
      userId: $userId,
      filter: $filter,
      order: $order,
      platform: $platform,
    ) {
      gameId
      gameName
      userRating
      platform
    }
  }
`;

export interface IQueryFavoriteListGet {
  favoriteListGet: IGameObject[];
}

export const QUERY_LIST_COUNT_GET = gql`
  query listCountGet(
    $userId: String!,
    $listType: String!,
  ) {
    listCountGet(
      userId: $userId,
      listType: $listType,
    )
  }
`;

export interface IQueryListCountGet {
  listCountGet: number;
}

export const QUERY_FAV_PLAT_GET = gql`
  query favoritePlatformGet(
    $userId: String!,
  ) {
    favoritePlatformGet(
      userId: $userId,
    )
  }
`;

export interface IQueryFavPlatGet {
  favoritePlatformGet: string;
}

export const QUERY_MOST_GIVEN_RATE = gql`
  query mostGivenRatingGet(
    $userId: String!,
  ) {
    mostGivenRatingGet(
      userId: $userId,
    )
  }
`;

export interface IQueryMostGivenRate {
  mostGivenRatingGet: number;
}

export const QUERY_UPCOMING_RELEASES = gql`
  query upcomingWantedGames(
    $userId: String!,
  ) {
    upcomingWantedGames(
      userId: $userId,
    ) {
      gameId
    }
  }
`;
export interface IQueryUpcomingReleases {
  upcomingWantedGames: IGameObject[];
}
