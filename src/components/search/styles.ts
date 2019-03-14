import glamourous from 'glamorous-native';
import { StatusBar } from 'react-native';

import { blue2, gray1 } from '../../helpers/colors';

export const SearchWrapper = glamourous.view({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  zIndex: 99,
});

export const InputDiv = glamourous.view({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  borderBottomWidth: 1,
  borderBottomColor: `${gray1}`,
});

export const DeleteButton = glamourous.touchableOpacity({
  position: 'absolute',
  top: 15 + StatusBar.length,
  right: 15,
});

export const SearchInput = glamourous.textInput({
  width: '100%',
  backgroundColor: 'white',
  padding: 15,
  fontSize: 18,
  marginRight: '5%',
  textAlign: 'center',
  fontWeight: 'bold',
  color: `${blue2}`,
});

export const LoadDiv = glamourous.view({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SearchEntryLoad = glamourous.view({
  width: '90%',
  height: 70,
  backgroundColor: `${gray1}`,
  borderRadius: 3,
  marginTop: 3,
});

export const SearchEntry = glamourous.touchableOpacity({
  width: '90%',
  height: 70,
  backgroundColor: 'white',
  borderRadius: 3,
  marginTop: 3,
  display: 'flex',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
  elevation: 2,
});

export const SearchCover = glamourous.view({
  padding: 5,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SearchInfo = glamourous.view({
  width: '70%',
  padding: 2,
  height: '100%',
});

export const SearchTitle = glamourous.text({
  fontSize: 14,
  fontWeight: 'bold',
  color: `${blue2}`,
});

export const SearchRelDate = glamourous.text({
  fontSize: 12,
  color: 'black',
});
