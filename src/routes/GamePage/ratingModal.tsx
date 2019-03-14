import * as React from 'react';
import { Mutation } from 'react-apollo';
import { Image } from 'react-native';

import { MUTATION_GAME_OBJECT_EDIT } from '../../../Data/mutations';
import { IGameObject } from '../../../Data/queries';
import { Rating } from '../../helpers/images';
import { RatingOptions, RatingOptionsText, RatingView } from './styles';

interface IModalProps {
  object: IGameObject;
  refetch: () => void;
}

class RatingModal extends React.Component<IModalProps> {
  public mutationHandler = async (update: any, rate: number) => {
    const { object, refetch } = this.props;

    try {
      await update({ variables: { ...object, userRating: rate } });
      await refetch();
    } catch (e) {
      console.log(e.messsage || e);
    }
  }

  public render() {
    const ratings = [
      {
        rating: 's',
        description: 'Masterpiece!',
        url: Rating.s,
      }, {
        rating: 'a',
        description: 'Must Play',
        url: Rating.a,
      }, {
        rating: 'b',
        description: 'Good Enough',
        url: Rating.b,
      }, {
        rating: 'c',
        description: 'Mediocre',
        url: Rating.c,
      }, {
        rating: 'd',
        description: 'Bad',
        url: Rating.d,
      }, {
        rating: 'f',
        description: 'Unplayable',
        url: Rating.f,
      }, {
        rating: 'no',
        description: 'Remove Rating',
        url: Rating.no,
      },
    ];

    return (
      <RatingView>
        <Mutation mutation={MUTATION_GAME_OBJECT_EDIT}>
        {
          (update) => (
            ratings.map((item, index) => (
              <RatingOptions
                key={index}
                onTouchStart={() => this.mutationHandler(update, (ratings.length - index - 1))}
              >
                <Image source={item.url} style={{height: 36, width: 36}} />
                <RatingOptionsText>
                  { item.description }
                </RatingOptionsText>
              </RatingOptions>
            ))
          )
        }
        </Mutation>
      </RatingView>
    );
  }
}

export default RatingModal;
