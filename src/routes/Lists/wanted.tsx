import { Auth } from 'aws-amplify';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { ActivityIndicator, Picker, ScrollView } from 'react-native';
import { NavigationEvents, NavigationScreenProp } from 'react-navigation';

import { IQueryWantedListGet, QUERY_WANTED_LIST_GET } from '../../../Data/queries';
import { blue3 } from '../../helpers/colors';
import { PlatformAbbreviator } from '../../helpers/platformNames';
import releaseDateCheck from '../../helpers/releaseDate';
import GameAPIService from '../../services';
import {
  ColumnName,
  Columns,
  LoaderView,
  Name,
  PlatformBox,
  RelDateBox,
  TableEntry,
  WhiteScreen,
  WrapperBox,
  WrapperBox50,
  WrapperBoxTouchable,
} from './styles';

interface IListProps extends WithApolloClient<{}> {
  navigation: NavigationScreenProp<any, any>;
}

interface IListStates {
  loading: boolean;
  queryLoading: boolean;
  filter: string;
  order: number;
  result: any[];
  userId: string;
  selectedFilter: string;
  platformFilter: string[];
}

class WantedList extends React.Component<IListProps, IListStates> {
  constructor(props: IListProps) {
    super(props);
    this.state = {
      loading: false,
      queryLoading: false,
      filter: 'releaseDate',
      order: 1,
      result: [],
      userId: '',
      selectedFilter: '',
      platformFilter: ['All Platforms'],
    };
  }

  public queryHandler = async () => {
    const { client } = this.props;
    const { filter, order, userId, platformFilter, selectedFilter } = this.state;

    this.setState({ queryLoading: true });

    try {
      const wantedListGet = await client.query<IQueryWantedListGet>({
        query: QUERY_WANTED_LIST_GET,
        fetchPolicy: 'network-only',
        variables: {
          userId,
          filter,
          order,
          platform: selectedFilter,
        },
      });

      const { data } = wantedListGet;

      if (data) {
        data.wantedListGet.map((item: any) => {
          if (platformFilter.indexOf(item.platform) <= -1) {
            platformFilter.push(item.platform);
          }
        });

        this.setState({
          queryLoading: false,
          result:
          data.wantedListGet.map((item: any, index: number) =>
            <TableEntry
              key={index} colored={index % 2 !== 0}
              onPress={() => this.navigationHandler(item.gameId)}
            >
              <Name>{item.gameName}</Name>
              <WrapperBox>
                <PlatformBox>{ PlatformAbbreviator(item.platform) }</PlatformBox>
              </WrapperBox>
              <WrapperBox>
                <RelDateBox>{ releaseDateCheck(item.releaseDate) }</RelDateBox>
              </WrapperBox>
            </TableEntry>,
          ),
        });
      }

    } catch (e) {
      console.log(e.message || e);
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

  public filterHandler = async (filter: string) => {
    await this.setState({filter, order: this.state.order * -1});
    this.queryHandler();
  }

  public navigationHandler = async (gameId: number) => {
    this.setState({loading: true});
    const { navigate } = this.props.navigation;

    const result = await GameAPIService.listToGameService(gameId);

    const gameName = result.name;
    const gameRelDate = result.first_release_date;
    const gameSS  = result.screenshots;
    const gameCover = result.coverUrl;
    const gamePlatforms = result.platforms;
    const gameRating = result.aggregated_rating;

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

    this.setState({loading: false});
  }

  public render() {
    const { filter, order, queryLoading, selectedFilter, platformFilter, result } = this.state;
    return(
      <ScrollView>
        <NavigationEvents onDidFocus={() => { this.queryHandler(); }} />
          {
            this.state.loading
            ? <WhiteScreen>
                <ActivityIndicator size='large' color='#0000ff' />
              </WhiteScreen>
            : null
          }
        <Columns>
          <WrapperBox50 onPress={() => this.filterHandler('gameName')}>
            <ColumnName> Game Name { filter === 'gameName' ? order === 1 ? '▲' : '▼' : null } </ColumnName>
          </WrapperBox50>
          <WrapperBoxTouchable onPress={() => this.filterHandler('platform')}>
            <ColumnName> Platform { filter === 'platform' ? order === 1 ? '▲' : '▼' : null } </ColumnName>
          </WrapperBoxTouchable>
          <WrapperBoxTouchable onPress={() => this.filterHandler('releaseDate')}>
            <ColumnName> Rel. Date { filter === 'releaseDate' ? order === 1 ? '▲' : '▼' : null } </ColumnName>
          </WrapperBoxTouchable>
        </Columns>
        <Picker
          selectedValue={selectedFilter}
          style={{
            height: 40,
            backgroundColor: blue3,
            color: 'white',
          }}
          onValueChange={(itemValue) => this.setState({selectedFilter: itemValue}, this.queryHandler)}
        >
          {
            platformFilter.map((item: string, index: number) =>
              <Picker.Item key={index} label={item} value={item === 'All Platforms' ? '' : item} />,
            )
          }
        </Picker>
        {
          queryLoading
          ? <LoaderView>
              <ActivityIndicator size='large' color='#0000ff' />
            </LoaderView>
          : result ? result : null
        }
      </ScrollView>
    );
  }
}

export default withApollo(WantedList);
