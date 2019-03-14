import * as React from 'react';
import { Image } from 'react-native';

export const Rating = {
  s: require('../../assets/images/sRate.png'),
  a: require('../../assets/images/aRate.png'),
  b: require('../../assets/images/bRate.png'),
  c: require('../../assets/images/cRate.png'),
  d: require('../../assets/images/dRate.png'),
  f: require('../../assets/images/fRate.png'),
  no: require('../../assets/images/noRate.png'),
  noAlt: require('../../assets/images/noRateAlt.png'),
};

export const ratingHandler = (value: number, size?: number, alt?: boolean) => {
  switch (value) {
    case 0: {
      return <Image style={{width: size || 48, height: size || 48}} source={ alt ? Rating.noAlt : Rating.no} />;
    }
    case 1: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.f} />;
    }
    case 2: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.d} />;
    }
    case 3: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.c} />;
    }
    case 4: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.b} />;
    }
    case 5: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.a} />;
    }
    case 6: {
      return <Image style={{width: size || 48, height: size || 48}} source={Rating.s} />;
    }
  }
};

export const NoSSLink = 'https://s3.amazonaws.com/gqxt/images/noSS.png';
export const NoCoverLink = 'https://s3.amazonaws.com/gqxt/images/noCover.png';
