import { Auth } from 'aws-amplify';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { ScrollView } from 'react-native';
import { NavigationEvents, NavigationScreenProp } from 'react-navigation';

import { IQueryUpcomingReleases, QUERY_UPCOMING_RELEASES } from '../../../Data/queries';
import releaseDateCheck from '../../helpers/releaseDate';
import GameAPIService from '../../services';
import { Center, CoverImage, GameCard, GameRelDate, GameTitle, Title1 } from './styles';

interface IReleaseProps extends WithApolloClient<{}> {
  navigation: NavigationScreenProp<any, any>;
}

interface IReleaseStates {
  result: any[];
  userId: string;
}

class NextReleases extends React.Component<IReleaseProps, IReleaseStates> {
  constructor(props: IReleaseProps) {
    super(props);
    this.state = {
      result: [],
      userId: '',
    };
  }

  public navigate = (
    gameId: number,
    gameName: string,
    gameRelDate: number,
    gameSS: string,
    gameCover: string,
    gamePlatforms: string[],
    gameRating: number,
  ) => {
    const { navigate } = this.props.navigation;

    navigate('GamePage', {
      gameId,
      gameName,
      gameRelDate,
      gameSS,
      gameCover,
      gamePlatforms,
      gameRating,
      userId: this.state.userId,
    });
  }

  public queryHandler = async () => {
    const { client } = this.props;
    const { userId } = this.state;

    try {
      const userUpcomingReleases = await client.query<IQueryUpcomingReleases>({
        query: QUERY_UPCOMING_RELEASES,
        fetchPolicy: 'network-only',
        variables: {
          userId,
        },
      });

      const { data } = userUpcomingReleases;

      if (data) {
        const result: any[] = await Promise.all(data.upcomingWantedGames.map(async (item) => {
          return GameAPIService.listToGameService(item.gameId);
        }));

        this.setState({
          result:
          result.map((item, index) =>
            <GameCard key={index} onPress={() => this.navigate(
              item.id,
              item.name,
              item.first_release_date,
              item.screenshots,
              item.coverUrl,
              item.platforms,
              item.aggregated_rating,
            )}>
              <CoverImage source={{uri: item.coverUrl}} />
              <GameTitle>{item.name}</GameTitle>
              <GameRelDate>{releaseDateCheck(item.first_release_date)}</GameRelDate>
            </GameCard>,
          ),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async componentDidMount() {
    let userId;

    try {
      const user = await Auth.currentAuthenticatedUser();
      userId = user.username;
      this.setState({userId});
      this.queryHandler();
    } catch (e) {
      console.log(e);
    }
  }

  public render() {
    return(
      this.state.result.length > 0
      ? <Center>
          <Title1>Next Releases</Title1>
          <ScrollView horizontal style={{height: 230}}>
            { this.state.result }
          </ScrollView>
          <NavigationEvents onWillFocus={() => this.queryHandler()} />
        </Center>
      : <NavigationEvents onWillFocus={() => this.queryHandler()} />
    );
  }
}

export default withApollo(NextReleases);
