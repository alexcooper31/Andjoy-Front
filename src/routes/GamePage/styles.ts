import glamourous from 'glamorous-native';
import { StatusBar } from 'react-native';

import { blue1, blue2, gray1 } from '../../helpers/colors';

export const MainDiv = glamourous.view({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: `${blue2}`,
});

export const HeadDiv = glamourous.view({
  width: '100%',
  height: '30%',
  backgroundColor: 'lightgray',
});

export const CoverDiv = glamourous.view({
  width: '100%',
  alignItems: 'center',
  marginTop: -100,
});

export const CoverImage = glamourous.image({
  width: 200,
  height: 200,
  borderRadius: 2,
});

export const GameInfo = glamourous.view({
  width: '100%',
  alignItems: 'center',
  padding: 10,
});

export const H1 = glamourous.text({
  fontSize: 24,
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
});

export const H4 = glamourous.text({
  fontSize: 14,
  color: 'white',
});

export const UserInputDiv = glamourous.view({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  padding: 10,
});

export const UserInputs = glamourous.touchableOpacity({
  width: '18%',
  height: 50,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
});

export const UserInputText = glamourous.text({
  color: 'white',
});

export const PlatformsDiv = glamourous.view({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  padding: 10,
  flexWrap: 'wrap',
});

interface IPlatformBox {
  selected?: boolean;
}

const dynamicStyles = (props: IPlatformBox) => ({
  borderColor: props.selected ? `${blue1}` : `${gray1}`,
  color: props.selected ? 'white' : `${gray1}`,
  backgroundColor: props.selected ? `${blue1}` : `${blue2}`,
  fontWeight: props.selected ? 'bold' : 'normal',
});

export const PlatformBox = glamourous.text(
  dynamicStyles,
  {
  borderWidth: 1,
  marginTop: 5,
  marginRight: 5,
  width: 60,
  paddingTop: 5,
  paddingBottom: 5,
  textAlign: 'center',
  borderRadius: 50,
});

export const RatingView = glamourous.view({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const RatingSizer = glamourous.view({
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const RatingOptions = glamourous.view({
  display: 'flex',
  alignItems: 'center',
  padding: 10,
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '65%',
  marginTop: 5,
  borderColor: `${gray1}`,
  borderWidth: 1,
  backgroundColor: `${blue2}`,
});

export const RatingOptionsText = glamourous.text({
  color: `${gray1}`,
  fontWeight: 'bold',
  fontSize: 18,
  marginLeft: 20,
});

export const BackButton = glamourous.touchableOpacity({
  top: StatusBar.currentHeight! + 5,
  position: 'absolute',
  left: 5,
  zIndex: 98,
});
