import { Auth } from 'aws-amplify';
import * as React from 'react';
import { Query, QueryResult, WithApolloClient } from 'react-apollo';
import { NavigationEvents, NavigationScreenProp } from 'react-navigation';

import {
  IQueryFavPlatGet,
  IQueryListCountGet,
  IQueryMostGivenRate,
  QUERY_FAV_PLAT_GET,
  QUERY_LIST_COUNT_GET,
  QUERY_MOST_GIVEN_RATE,
} from '../../../Data/queries';
import Search from '../../components/search';
import { PlatformAbbreviator } from '../../helpers/platformNames';
import NextReleases from './nextReleases';
import {
  Content,
  InfoBox,
  InfoBoxTitle,
  InfoBoxValue,
  MainDiv,
  MainScrollView,
  SearchDiv,
} from './styles';

interface IHomeProps extends WithApolloClient<{}> {
  navigation: NavigationScreenProp<any, any>;
}

interface IHomeStates {
  userId: string;
}

class Home extends React.Component<IHomeProps, IHomeStates> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  public async componentDidMount() {
    let userId;

    try {
      const user = await Auth.currentAuthenticatedUser();
      userId = user.username;
      this.setState({userId});
    } catch (e) {
      console.log(e);
    }
  }

  public boxEntry = (value: any, type: string, refetch: () => void) => {
    const { navigate } = this.props.navigation;

    return (
      <InfoBox onPress={() => navigate(type)}>
        <InfoBoxValue>{value}</InfoBoxValue>
        <InfoBoxTitle>{type} Games</InfoBoxTitle>
        <NavigationEvents onWillFocus={() => { refetch(); }} />
      </InfoBox>
    );
  }

  public listCount = (result: QueryResult<IQueryListCountGet>) => {
    const { data, loading, variables, refetch } = result;

    if (loading) {
      return null;
    }

    if (data) {
      const { listCountGet } = data;
      return this.boxEntry(listCountGet, variables.name, refetch);
    }

    return null;
  }

  public favoriteBox = (value: string, refetch: () => void) => {
    const { navigate } = this.props.navigation;

    return (
      <InfoBox onPress={() => navigate('Played')}>
        <InfoBoxValue>{PlatformAbbreviator(value)}</InfoBoxValue>
        <InfoBoxTitle>Favorite Console</InfoBoxTitle>
        <NavigationEvents onWillFocus={() => { refetch(); }} />
      </InfoBox>
    );
  }

  public favoriteCount = (result: QueryResult<IQueryFavPlatGet>) => {
    const { data, loading, refetch } = result;

    if (loading) {
      return null;
    }

    if (data) {
      const { favoritePlatformGet } = data;
      if (favoritePlatformGet !== null) {
        return this.favoriteBox(favoritePlatformGet, refetch);
      }
    }

    return null;
  }

  public ratingHandler = (value: number) => {
    switch (value) {
      case 1: {
        return 'F';
      }
      case 2: {
        return 'D';
      }
      case 3: {
        return 'C';
      }
      case 4: {
        return 'B';
      }
      case 5: {
        return 'A';
      }
      case 6: {
        return 'S';
      }
    }
  }

  public mostGivenRateBox = (value: number, refetch: () => void) => {
    const { navigate } = this.props.navigation;

    return (
      <InfoBox onPress={() => navigate('Played')}>
        <InfoBoxValue>{this.ratingHandler(value)}</InfoBoxValue>
        <InfoBoxTitle>Most Given Rating</InfoBoxTitle>
        <NavigationEvents onWillFocus={() => { refetch(); }} />
      </InfoBox>
    );
  }

  public givenRateCount = (result: QueryResult<IQueryMostGivenRate>) => {
    const { data, loading, refetch } = result;

    if (loading) {
      return null;
    }

    if (data) {
      const { mostGivenRatingGet } = data;
      if (mostGivenRatingGet > 0) {
        return this.mostGivenRateBox(mostGivenRatingGet, refetch);
      }
    }

    return null;
  }

  public render() {
    const { userId } = this.state;

    return (
      <MainDiv>
        <SearchDiv>
          <Search userId={userId} navigation={this.props.navigation} />
        </SearchDiv>

        <MainScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
          <NextReleases navigation={this.props.navigation} client={this.props.client} />
          <Content>
            <Query
              query={QUERY_LIST_COUNT_GET}
              variables={{ userId, listType: 'isWanted', name: 'Wanted' }}
            >
              {this.listCount}
            </Query>
            <Query
              query={QUERY_LIST_COUNT_GET}
              variables={{ userId, listType: 'isPlayed', name: 'Played' }}
            >
              {this.listCount}
            </Query>
            <Query
              query={QUERY_LIST_COUNT_GET}
              variables={{ userId, listType: 'isFavorite', name: 'Favorites' }}
            >
              {this.listCount}
            </Query>
            <Query query={QUERY_FAV_PLAT_GET} variables={{ userId }}>
              {this.favoriteCount}
            </Query>
            <Query query={QUERY_MOST_GIVEN_RATE} variables={{ userId }}>
              {this.givenRateCount}
            </Query>
          </Content>
        </MainScrollView>
      </MainDiv>
    );
  }
}

export default Home;
