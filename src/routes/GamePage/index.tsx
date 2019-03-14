import * as React from 'react';
import { Mutation, Query, QueryResult } from 'react-apollo';
import { ImageBackground, Modal, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreenProp } from 'react-navigation';

import { MUTATION_GAME_OBJECT_EDIT } from '../../../Data/mutations';
import { IGameObject, IQueryGameObjGet, QUERY_GAME_OBJECT_GET } from '../../../Data/queries';
import { blue1, gray1 } from '../../helpers/colors';
import { NoCoverLink, NoSSLink, ratingHandler } from '../../helpers/images';
import { PlatformAbbreviator } from '../../helpers/platformNames';
import releaseDateCheck from '../../helpers/releaseDate';
import GameAPIService from '../../services';
import PlatformRender from './platforms';
import RatingModal from './ratingModal';
import {
  BackButton,
  CoverDiv,
  CoverImage,
  GameInfo,
  H1,
  H4,
  HeadDiv,
  MainDiv,
  PlatformsDiv,
  RatingSizer,
  UserInputDiv,
  UserInputs,
  UserInputText,
} from './styles';

interface IGameStates {
  loading: boolean;
  coverUrl: string;
  releaseDate: string;
  screenshotUrl: string;
  platforms: any[];
  isWanted: boolean;
  isPlayed: boolean;
  isFavorite: boolean;
  userRating: number;
  ratingModal: boolean;
}

interface IGameProps {
  navigation: NavigationScreenProp<any, any>;
}

class GamePage extends React.Component<IGameProps, IGameStates> {
  constructor(props: IGameProps) {
    super(props);
    this.state = {
      loading: false,
      coverUrl: 'null',
      releaseDate: '',
      screenshotUrl: NoSSLink,
      platforms: [],
      isWanted: false,
      isPlayed: false,
      isFavorite: false,
      userRating: 0,
      ratingModal: false,
    };
  }

  public async componentDidMount() {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const gameReleaseDate = navigation.getParam('gameRelDate');
    const gameCover = navigation.getParam('gameCover');
    const gamePlatforms = navigation.getParam('gamePlatforms');
    const gameRatings = navigation.getParam('gameRating');
    const gameScreenshots = navigation.getParam('gameSS');

    let coverUrl;
    if (gameCover === undefined) {
      coverUrl = NoCoverLink;
    } else {
      coverUrl = gameCover;
    }
    const releaseDate = releaseDateCheck(gameReleaseDate);
    const screenshotUrl = await GameAPIService.screenshotService(gameScreenshots);
    const platforms = await GameAPIService.getPlatforms(gamePlatforms);

    this.setState({ loading: false, coverUrl, releaseDate, screenshotUrl, platforms });
  }

  public ratingModalHandler = () => {
    this.setState({ ratingModal: true });
  }

  public mutationHandler = async (update: any, refetch: () => void, object: IGameObject, operator: string) => {
    try {
      if (operator === 'wanted') {
        await update({ variables: { ...object, isWanted: !object.isWanted, isPlayed: false } });
        await refetch();
      } else if (operator === 'played') {
        await update({ variables: { ...object, isWanted: false, isPlayed: !object.isPlayed } });
        await refetch();
      } else if (operator === 'favorite') {
        await update({ variables: { ...object, isFavorite: !object.isFavorite } });
        await refetch();
      } else if (operator === 'favorite') {
        await update({ variables: { ...object, isFavorite: !object.isFavorite } });
        await refetch();
      } else {
        await update({ variables: { ...object, platform: operator } });
        await refetch();
      }
    } catch (e) {
      console.log(e.message || e);
    }
  }

  public BodyHandler = (object: IGameObject, refetch: () => void) => {
    const { navigation } = this.props;
    const gameName = navigation.getParam('gameName');
    const {
      coverUrl,
      releaseDate,
      screenshotUrl,
      platforms,
      loading,
    } = this.state;

    return (
      <MainDiv onTouchStart={() => this.setState({ratingModal: false})}>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name='chevron-left' color='#ffffff' size={48} />
        </BackButton>
        <HeadDiv>
          <ImageBackground
            source={{ uri: screenshotUrl }}
            style={{ width: '100%', height: '100%' }}
            blurRadius={1}
          />
        </HeadDiv>
        <CoverDiv>
        {
          loading
          ? <Progress.Circle size={100} indeterminate={true} borderWidth={8} color={gray1} />
          : <CoverImage source={{ uri: coverUrl }} resizeMode='contain' />
        }
        </CoverDiv>

        <GameInfo>
          <H1>
            { gameName }
          </H1>
          <H4>
            { releaseDate }
          </H4>
        </GameInfo>

        <Mutation mutation={MUTATION_GAME_OBJECT_EDIT}>
          {
            (update) => (
              <UserInputDiv>
                <UserInputs onPress={() => this.mutationHandler(update, refetch, object, 'wanted')}>
                  {
                    object.isWanted
                    ? <Icon name='playlist-add-check' size={48} color={blue1} />
                    : <Icon name='playlist-add' size={48} color={gray1} />
                  }
                  <UserInputText>Want</UserInputText>
                </UserInputs>

                <UserInputs onPress={() => this.mutationHandler(update, refetch, object, 'played')}>
                  {
                    object.isPlayed
                    ? <Icon name='playlist-add-check' size={48} color={blue1} />
                    : <Icon name='playlist-add' size={48} color={gray1} />
                  }
                  <UserInputText>Played</UserInputText>
                </UserInputs>

                <UserInputs onPress={() => this.mutationHandler(update, refetch, object, 'favorite')}>
                  {
                    object.isFavorite
                    ? <Icon name='star' size={48} color={blue1} />
                    : <Icon name='star' size={48} color={gray1} />
                  }
                  <UserInputText>Favorite</UserInputText>
                </UserInputs>

                <UserInputs onPress={() => this.ratingModalHandler()}>
                  <RatingSizer>
                    {
                      ratingHandler(object.userRating, 36)
                    }
                  </RatingSizer>
                  <UserInputText>Rating</UserInputText>
                </UserInputs>

                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={this.state.ratingModal}
                  onRequestClose={() => this.setState({ ratingModal: false })}
                >
                  <RatingModal object={object} refetch={refetch} />
                </Modal>
              </UserInputDiv>
            )
          }
        </Mutation>

        <PlatformsDiv>
          <Mutation mutation={MUTATION_GAME_OBJECT_EDIT}>
          { (update) => (
            platforms.map((item, index) =>
            <View onTouchStart={() => this.mutationHandler(update, refetch, object, item.name)} key={index}>
              <PlatformRender platform={object.platform} check={item.name}>
                {PlatformAbbreviator(item.name)}
              </PlatformRender>
            </View>,
            )
          )}
          </Mutation>
        </PlatformsDiv>
      </MainDiv>
    );
  }

  public userInputRender = (result: QueryResult<IQueryGameObjGet>) => {
    const { data, loading, refetch } = result;

    if (loading) {
      return null;
    }

    if (data) {
      const { gameObjectGet } = data;
      return this.BodyHandler(gameObjectGet, refetch);
    }

    return null;
  }

  public render() {
    const { navigation } = this.props;
    const gameId = navigation.getParam('gameId');
    const userId = navigation.getParam('userId');

    return(
      <Query query={QUERY_GAME_OBJECT_GET} variables={{ userId, gameId }}>
        { this.userInputRender }
      </Query>
    );
  }
}

export default GamePage;
