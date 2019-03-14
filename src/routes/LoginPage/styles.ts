import glamorous from 'glamorous-native';

import { StatusBar } from 'react-native';
import { blue2, blue3, gray1 } from '../../helpers/colors';

export const MainDiv = glamorous.view({
  backgroundColor: `${blue2}`,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: StatusBar.currentHeight,
});

export const InfoView = glamorous.view({
  width: '80%',
  justifyContent: 'center',
  alignItems: 'center',
});

interface IStyles {
  error?: boolean;
}

const dynamicStyles = (props: IStyles) => ({
  borderColor: props.error ? 'red' : `${gray1}`,
});

export const InputView = glamorous.view(
  dynamicStyles, {
  borderBottomWidth: 1,
  width: '100%',
  marginTop: 40,
  flexDirection: 'row',
  paddingBottom: 5,
});

export const StyledInput = glamorous.textInput({
  color: 'white',
  minWidth: '80%',
  paddingLeft: 5,
  fontSize: 18,
});

export const UnderInputView = glamorous.touchableOpacity({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  marginTop: 10,
});

export const UnderInputText = glamorous.text({
  color: `${gray1}`,
  fontSize: 14,
});

export const SignInButton = glamorous.touchableOpacity({
  width: '100%',
  padding: 20,
  backgroundColor: `${gray1}`,
  marginTop: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const SignInText = glamorous.text({
  color: `${blue2}`,
  fontSize: 18,
});

export const SignUpText = glamorous.text({
  color: `${gray1}`,
});

export const SignUpButton = glamorous.touchableOpacity({
  width: '100%',
  padding: 10,
  backgroundColor: `${blue3}`,
  marginTop: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Title = glamorous.text({
  fontSize: 22,
  fontWeight: 'bold',
  color: `${gray1}`,
  marginTop: 30,
});

export const BackButton = glamorous.touchableOpacity({
  position: 'absolute',
  top: StatusBar.currentHeight,
  left: 5,
});

export const LogoView = glamorous.view({
  flexDirection: 'row',
});

export const LogoText = glamorous.text({
  fontSize: 64,
  fontFamily: 'Strasua',
});

export const LoadingView = glamorous.view({
  backgroundColor: 'black',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.8,
});

export const CenterView = glamorous.view({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ForgotPassInput = glamorous.textInput({
  borderWidth: 1,
  borderColor: `${gray1}`,
  borderRadius: 5,
  backgroundColor: `${blue2}`,
  width: '100%',
  padding: 3,
  color: `${gray1}`,
  marginTop: 5,
  textAlign: 'center',
});

export const ForgotPassButton = glamorous.touchableOpacity({
  width: '100%',
  marginTop: 5,
  padding: 8,
  backgroundColor: `${blue3}`,
  borderRadius: 3,
  alignItems: 'center',
});

export const CodeView = glamorous.view({
  width: '90%',
  backgroundColor: 'white',
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

export const ErrorText = glamorous.text({
  color: 'red',
  padding: 3,
});
