import axios from 'axios';

import ENV from '../../env';
import { NoCoverLink, NoSSLink } from '../helpers/images';

const url = 'https://api-v3.igdb.com';
const userKey = ENV.dev.igdbApiKey;

const GameAPIService = {
  getPlatforms: async (gamePlatforms?: any) => {
    if (gamePlatforms) {
      const platforms = await Promise.all(gamePlatforms.map(async (item: any) => {
        const result = await axios.get(`${url}/platforms/${item}?fields=name`, {
          headers: {
            'user-key': userKey,
            'Accept': 'application/json',
          },
        });

        return result.data[0];
      }));

      return platforms;
    }

    return [];
  },

  coverService: async (gameCover?: any) => {
    let coverUrl: any;
    if (gameCover) {
      const coverGet = await axios.get(`${url}/covers/${gameCover}?fields=url`, {
        headers: {
          'user-key': userKey,
          'Accept': 'application/json',
        },
      });
      coverUrl = 'https:' +  coverGet.data[0].url.replace('thumb', 'cover_big');
    }

    return coverUrl;
  },

  screenshotService: async (gameScreenshots?: any) => {
    let screenshotUrl: any;
    if (gameScreenshots) {
      const screenshotGet = await axios.get(`${url}/screenshots/${gameScreenshots[0]}?fields=url`, {
        headers: {
          'user-key': userKey,
          'Accept': 'application/json',
        },
      });
      screenshotUrl = 'https:' + screenshotGet.data[0].url.replace('thumb', 'screenshot_med');
    } else {
      screenshotUrl = NoSSLink;
    }

    return screenshotUrl;
  },

  searchService: async (text: string) => {
    const { data } = await axios.get(`${url}/games/?search=${text}&fields=id&limit=5`, {
      headers: {
        'user-key': userKey,
        'Accept': 'application/json',
      },
    });

    try {
      const result: any[] = await Promise.all(data.map((item: any) => {
        return axios.get(`${url}/games/${item.id}?fields=
          name,
          aggregated_rating,
          cover,
          screenshots,
          platforms,
          first_release_date`, {
          headers: {
            'user-key': userKey,
            'Accept': 'application/json',
          },
        })
        .then(async (res) => {
          const gameData = res.data[0];
          try {
            const coversResult = await axios.get(
              `${url}/covers/${gameData.cover}?fields=url`,
              {
                headers: {
                  'user-key': userKey,
                  'Accept': 'application/json',
                },
              },
            );

            return {
              ...gameData,
              coverUrl: `https:${coversResult.data[0].url}`.replace('thumb', 'cover_big'),
            };
          } catch (e) {
            return {
              ...gameData,
              coverUrl: NoCoverLink,
            };
          }
        });
      }));
      return result;
    } catch (e) {
      return [];
    }
  },

  listToGameService: async (gameId: number) => {
    try {
      const result = axios.get(`${url}/games/${gameId}?fields=
        id,
        name,
        aggregated_rating,
        cover,
        screenshots,
        platforms,
        first_release_date`, {
        headers: {
          'user-key': userKey,
          'Accept': 'application/json',
        },
      })
      .then(async (res) => {
        const gameData = res.data[0];
        try {
          const coversResult = await axios.get(
            `${url}/covers/${gameData.cover}?fields=url`,
            {
              headers: {
                'user-key': userKey,
                'Accept': 'application/json',
              },
            },
          );

          return {
            ...gameData,
            coverUrl: `https:${coversResult.data[0].url}`.replace('thumb', 'cover_big'),
          };
        } catch (e) {
          return {
            ...gameData,
            coverUrl: NoCoverLink,
          };
        }
      });
      return result;
    } catch (e) {
      return [];
    }
  },
};

export default GameAPIService;
