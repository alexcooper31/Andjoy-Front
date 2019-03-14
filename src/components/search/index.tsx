import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreenProp } from 'react-navigation';

import { MUTATION_GAME_OBJECT_CREATE } from '../../../Data/mutations';
import { blue2 } from '../../helpers/colors';
import releaseDateCheck from '../../helpers/releaseDate';
import GameAPIService from '../../services';
import {
  DeleteButton,
  InputDiv,
  LoadDiv,
  SearchCover,
  SearchEntry,
  SearchEntryLoad,
  SearchInfo,
  SearchInput,
  SearchRelDate,
  SearchTitle,
  SearchWrapper,
} from './styles';

interface ISearchScreenProps {
  navigation: NavigationScreenProp<any, any>;
  userId: string;
}

interface IResults {
  id: number;
  name: string;
  first_release_date: number;
  screenshots: string;
  cover: string;
  platforms: string[];
  aggregated_rating: number;
  create: any;
  coverUrl: string;
}

interface ISearchStates {
  searchResults: IResults[];
  loading: boolean;
  searchText: string;
  timeout?: any;
  placeholderText: string;
}

class Search extends React.Component<ISearchScreenProps, ISearchStates> {
  constructor(props: ISearchScreenProps) {
    super(props);
    this.state = {
      searchResults: [],
      loading: false,
      searchText: '',
      placeholderText: 'Search Games',
    };
  }

  public onSearch = async (text: string) => {
    this.setState({
      searchText: text,
      loading: true,
      timeout:
        setTimeout(async () => {
          if (text !== '') {
            let result = await GameAPIService.searchService(text);

            if (result.length === 0) {
              result = [{name: 'no results', first_release_date: 1000000001}];
            }

            Keyboard.dismiss();
            this.setState({ loading: false, searchResults: result });
          } else {
            this.setState({ loading: false, searchResults: [] });
          }
        }, 2000),
    });
  }

  public OnChange = async (text: string) => {
    const { timeout } = this.state;

    clearTimeout(timeout);
    this.onSearch(text);
  }

  public GamePageHandler = async (
    gameId: number,
    gameName: string,
    gameRelDate: number,
    gameSS: string,
    gameCover: string,
    gamePlatforms: string[],
    gameRating: number,
    create: any,
  ) => {
    const { navigate } = this.props.navigation;

    let releaseDate;
    if (gameRelDate === undefined) {
      releaseDate = 1000000001;
    } else {
      releaseDate = gameRelDate;
    }

    try {
      await create({ variables: { userId: this.props.userId, gameId, gameName, releaseDate } });
    } catch (e) {
      console.log(e.message || e);
    }

    this.setState({ searchText: '', loading: false, searchResults: [] });

    navigate('GamePage', {
      gameId,
      gameName,
      gameRelDate,
      gameSS,
      gameCover,
      gamePlatforms,
      gameRating,
      userId: this.props.userId,
    });
  }

  public clearHandler = () => {
    this.setState({ searchText: '', loading: false, searchResults: [] });
    clearTimeout(this.state.timeout);
  }

  public render() {
    const { searchResults, loading, searchText, placeholderText } = this.state;
    const Entryload = Animatable.createAnimatableComponent(SearchEntryLoad);

    return (
      <SearchWrapper>
        <InputDiv>
          <SearchInput
            value={searchText}
            placeholder={placeholderText}
            placeholderTextColor={blue2}
            onChangeText={this.OnChange}
            onFocus={() => this.setState({ placeholderText: '' })}
            onBlur={() => this.setState({ placeholderText: 'Search Games' })}
          />
        </InputDiv>
        {
          searchText !== ''
          ? <DeleteButton onPress={this.clearHandler}><Icon name='clear' size={25} /></DeleteButton>
          : <DeleteButton><Icon name='search' size={25} color={blue2} /></DeleteButton>
        }
        {
          loading
          ? <LoadDiv>
              {
                new Array(1, 2, 3, 4, 5).map((item) =>
                  <Entryload
                    key={item}
                    animation='flash'
                    easing='ease-in-out'
                    iterationCount='infinite'
                    duration={3000}
                  />,
                )
              }
            </LoadDiv>
          : <Mutation mutation={MUTATION_GAME_OBJECT_CREATE}>
          {
            (create) => (
              searchResults.map((item, index) =>
                <SearchEntry key={index} onPress={() => this.GamePageHandler(
                  item.id,
                  item.name,
                  item.first_release_date,
                  item.screenshots,
                  item.coverUrl,
                  item.platforms,
                  item.aggregated_rating,
                  create,
                  )}
                >
                  <SearchCover>
                    {
                      item.coverUrl
                      ? <Image
                        style={{width: 60, height: 60}}
                        indicator={Progress.Circle}
                        indicatorProps={{ borderWidth: 3 }}
                        source={{ uri: item.coverUrl.replace('cover_big', 'thumb') }} />
                      : null
                    }
                  </SearchCover>
                  <SearchInfo>
                    <SearchTitle style={item.name === 'no results' ? {fontSize: 20} : null}>
                      { item.name }
                    </SearchTitle>
                    <SearchRelDate>
                      { releaseDateCheck(item.first_release_date, true) }
                    </SearchRelDate>
                  </SearchInfo>
                </SearchEntry>,
              )
            )
          }
          </Mutation>
        }
      </SearchWrapper>
    );
  }
}

export default Search;
