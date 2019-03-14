import gql from 'graphql-tag';

export const MUTATION_GAME_OBJECT_CREATE = gql`
  mutation createGameObject(
    $userId: String!,
    $gameId: Int!,
    $gameName: String,
    $releaseDate: Int,
  ) {
    createGameObject(
      userId: $userId,
      gameId: $gameId,
      gameName: $gameName,
      releaseDate: $releaseDate,
    )
  }
`;

export interface IMutationCreateGameObject {
  createGameObject: boolean;
}

export const MUTATION_GAME_OBJECT_EDIT = gql`
  mutation editGameObject(
    $userId: String!,
    $gameId: Int!,
    $isWanted: Boolean,
    $isPlayed: Boolean,
    $isFavorite: Boolean,
    $userRating: Int,
    $platform: String,
  ) {
    editGameObject(
      userId: $userId,
      gameId: $gameId,
      isWanted: $isWanted,
      isPlayed: $isPlayed,
      isFavorite: $isFavorite,
      userRating: $userRating,
      platform: $platform,
    )
  }
`;

export interface IMutationEditGameObject {
  editGameObject: boolean;
}
