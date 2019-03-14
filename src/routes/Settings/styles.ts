import glamorous from 'glamorous-native';
import { StatusBar } from 'react-native';

import { blue1, blue2, blue3, gray1 } from '../../helpers/colors';

export const MainDiv = glamorous.view({
  backgroundColor: 'white',
  paddingTop: StatusBar.currentHeight,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const InfoWrapper = glamorous.view({
  width: '95%',
  elevation: 3,
  borderRadius: 3,
  borderColor: `${blue3}`,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
});

export const InfoText = glamorous.text({
  fontSize: 16,
  fontWeight: 'bold',
  color: `${blue1}`,
});

export const StyledInput = glamorous.textInput({
  width: '100%',
  padding: 3,
  borderBottomWidth: 2,
  borderBottomColor: `${gray1}`,
  textAlign: 'center',
  marginTop: 10,
  color: `${blue2}`,
});

export const InfoButton = glamorous.touchableOpacity({
  width: '100%',
  backgroundColor: `${blue1}`,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  borderRadius: 3,
});

export const OptionButton = glamorous.touchableOpacity({
  width: '95%',
  backgroundColor: `${blue1}`,
  padding: 10,
  alignItems: 'center',
  elevation: 3,
  marginTop: 20,
});

export const ErrorText = glamorous.text({
  color: 'red',
  padding: 3,
});

export const CenterView = glamorous.view({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const CodeView = glamorous.view({
  width: '95%',
  backgroundColor: `${blue2}`,
  borderRadius: 5,
  padding: 20,
});

export const CodeInput = glamorous.textInput({
  borderWidth: 1,
  borderColor: `${blue2}`,
  borderRadius: 5,
  backgroundColor: 'white',
  width: '100%',
  padding: 3,
  color: `${blue2}`,
  marginTop: 5,
  textAlign: 'center',
});
