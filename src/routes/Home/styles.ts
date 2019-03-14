import glamourous from 'glamorous-native';
import { StatusBar } from 'react-native';

import { blue1, blue2 } from '../../helpers/colors';

export const MainDiv = glamourous.view({
  backgroundColor: 'white',
  paddingTop: StatusBar.currentHeight,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});

export const SearchDiv = glamourous.view({
  width: '100%',
});

export const Content = glamourous.view({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const InfoBox = glamourous.touchableOpacity({
  alignItems: 'center',
  justifyContent: 'center',
  width: '45%',
  height: 0,
  paddingBottom: '22.5%',
  paddingTop: '22.5%',
  elevation: 3,
  backgroundColor: 'white',
  margin: 5,
});

export const InfoBoxTitle = glamourous.text({
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  color: `${blue2}`,
  fontSize: 18,
});

export const InfoBoxValue = glamourous.text({
  width: '100%',
  textAlign: 'center',
  color: `${blue1}`,
  fontSize: 48,
});

export const Title1 = glamourous.text({
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  color: `${blue2}`,
  fontSize: 22,
  marginTop: 5,
  marginBottom: 5,
});

export const MainScrollView = glamourous.scrollView({
  width: '100%',
  height: '100%',
});

export const GameCard = glamourous.touchableOpacity({
  width: 155,
  height: 220,
  marginLeft: 6,
  marginRight: 2,
  marginTop: 5,
  display: 'flex',
  alignItems: 'center',
  elevation: 3,
  backgroundColor: 'white',
  borderRadius: 5,
  padding: 8,
});

export const GameTitle = glamourous.text({
  marginTop: 5,
  fontWeight: 'bold',
  color: `${blue2}`,
  fontSize: 16,
  textAlign: 'center',
});

export const GameRelDate = glamourous.text({
  color: `${blue1}`,
  fontWeight: 'bold',
});

export const CoverImage = glamourous.image({
  width: 140,
  height: 140,
  borderRadius: 3,
});

export const Center = glamourous.view({
  width: '95%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
