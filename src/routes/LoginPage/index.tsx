import { Auth } from 'aws-amplify';
import { Font } from 'expo';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Text, ToastAndroid } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation';

import { blue1, blue2, gray1 } from '../../helpers/colors';
import {
  CenterView,
  CodeInput,
  CodeView,
  ErrorText,
  ForgotPassButton,
  ForgotPassInput,
  InfoView,
  InputView,
  LoadingView,
  LogoText,
  LogoView,
  MainDiv,
  SignInButton,
  SignInText,
  SignUpButton,
  SignUpText,
  StyledInput,
  UnderInputText,
  UnderInputView,
} from './styles';
import UserCreate from './userCreate';

interface IValues {
  username: string;
  email: string;
  password: string;
  modal: boolean;
  fontLoaded: boolean;
  loading: boolean;
  error: boolean;
  forgotPassOpen: boolean;
  checkingUser: boolean;
  forgotUsername: string;
  changePassModal: boolean;
  newPassword: string;
  verificationCode: string;
  newPasswordError: boolean;
  invalidCode: boolean;
  expiredCode: boolean;
  noUserFound: boolean;
  limitExceeded: boolean;
}

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class Login extends React.Component<IProps, IValues> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      modal: false,
      fontLoaded: false,
      loading: false,
      error: false,
      checkingUser: true,
      forgotPassOpen: false,
      forgotUsername: '',
      changePassModal: false,
      newPassword: '',
      verificationCode: '',
      newPasswordError: false,
      invalidCode: false,
      expiredCode: false,
      noUserFound: false,
      limitExceeded: false,
    };
  }

  public async componentDidMount() {
    try {
      await Auth.currentAuthenticatedUser();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (e) {
      await Font.loadAsync({
        Strasua: require('../../../assets/fonts/strasua.ttf'),
      });

      this.setState({ fontLoaded: true, checkingUser: false });
    }
  }

  public handleSubmit = async () => {
    const { username, password } = this.state;
    this.setState({loading: true});

    try {
      await Auth.signIn(username , password);
      this.setState({loading: false, error: false});
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (e) {
      this.setState({loading: false, error: true});
    }
  }

  public handleUsername = (text: string) => {
    this.setState({ username: text });
  }

  public handlePassword = (text: string) => {
    this.setState({ password: text });
  }

  public closeModal = () => {
    this.setState({ modal: false });
  }

  public closeForgotModal = () => {
    this.setState({ forgotPassOpen: false });
  }

  public forgotUsername = (text: string) => {
    this.setState({ forgotUsername: text, noUserFound: false, limitExceeded: false });
  }

  public sendEmailHandler = async () => {
    Keyboard.dismiss();
    this.setState({loading: true});

    try {
      await Auth.forgotPassword(this.state.forgotUsername);
      this.setState({changePassModal: true, forgotPassOpen: false, loading: false});
    } catch (e) {
      if (e.code === 'UserNotFoundException') {
        this.setState({ noUserFound: true, loading: false });
      } else if (e.code === 'LimitExceededException') {
        this.setState({ limitExceeded: true, loading: false });
      }
    }
  }

  public newPasswordHandler = (text: string) => {
    this.setState({newPassword: text, newPasswordError: false});
  }

  public verificationCodeHandler = (text: string) => {
    this.setState({verificationCode: text, invalidCode: false, expiredCode: false});
  }

  public changePasswordHandler = async () => {
    const { forgotUsername, verificationCode, newPassword } = this.state;

    try {
      await Auth.forgotPasswordSubmit(forgotUsername, verificationCode, newPassword);
      this.setState({changePassModal: false});
      ToastAndroid.showWithGravity('Password Changed!', ToastAndroid.SHORT, ToastAndroid.TOP);
    } catch (e) {
      if (e.code === 'CodeMismatchException') {
        this.setState({invalidCode: true});
      } else if (e.code === 'ExpiredCodeException') {
        this.setState({expiredCode: true});
      } else if (e.message.includes('greater than or equal to 6')) {
        this.setState({newPasswordError: true});
      }
    }
  }

  public render() {
    const { checkingUser, invalidCode, expiredCode, newPasswordError, limitExceeded, noUserFound } = this.state;

    if (checkingUser) {
      return null;
    }

    return (
      <KeyboardAvoidingView style={{width: '100%'}} behavior='padding' enabled>
        <MainDiv>

          <Modal
            animationType='slide'
            visible={this.state.changePassModal}
            transparent
            onRequestClose={() => this.setState({changePassModal: false})}
          >
          <CenterView style={{height: '100%'}}>
            <CodeView>
              <CodeInput
                placeholder='Verification Code'
                placeholderTextColor={blue2}
                onChangeText={this.verificationCodeHandler}
              />
              { invalidCode ? <ErrorText>Invalid Code</ErrorText> : null }
              { expiredCode ? <ErrorText>Expired Code</ErrorText> : null }
              <CodeInput
                placeholder='New Password'
                secureTextEntry
                placeholderTextColor={blue2}
                onChangeText={this.newPasswordHandler}
              />
              { newPasswordError ? <ErrorText>Password has less than 6 characters!</ErrorText> : null }
              <ForgotPassButton onPress={this.changePasswordHandler}>
                <Text style={{color: 'white'}}>Submit</Text>
              </ForgotPassButton>
            </CodeView>
          </CenterView>
          </Modal>

          <Modal
            animationType='none'
            visible={this.state.loading}
            onRequestClose={() => this.setState({loading: false})}
            transparent
          >
            <LoadingView>
              <Progress.Circle size={100} indeterminate={true} borderWidth={8} color={blue1} />
            </LoadingView>
          </Modal>

          {
            this.state.fontLoaded
            ? <LogoView>
                <LogoText style={{ color: `${gray1}` }}>
                  AND
                </LogoText>
                <LogoText style={{ color: `${blue1}` }}>
                  JOY
                </LogoText>
              </LogoView>
            : null
          }

          <Modal
            animationType='slide'
            visible={this.state.modal}
            onRequestClose={() => this.setState({modal: false})}
          >
            <UserCreate close={this.closeModal} />
          </Modal>

          <InfoView>
            {
              this.state.error
              ? <UnderInputView style={{alignItems: 'center'}}>
                  <UnderInputText style={{color: 'red'}}>Wrong Username or Password</UnderInputText>
                </UnderInputView>
              : null
            }
            <InputView>
              <Icon name='lock-outline' color={gray1} size={25} />
              <StyledInput
                onChangeText={this.handleUsername}
                placeholder='Username or Email'
                placeholderTextColor='lightgray'
              />
            </InputView>
            <InputView>
              <Icon name='person-outline' color={gray1} size={25} />
              <StyledInput
                onChangeText={this.handlePassword}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor='lightgray'
              />
            </InputView>
            <UnderInputView onPress={() => this.setState({forgotPassOpen: !this.state.forgotPassOpen})}>
              <UnderInputText>Forgot your password?</UnderInputText>
            </UnderInputView>

            {
              this.state.forgotPassOpen
              ? <CenterView>
                  <ForgotPassInput onChangeText={this.forgotUsername} placeholder='Input your Username' />
                  { noUserFound ? <ErrorText>User not found</ErrorText> : null }
                  { limitExceeded ? <ErrorText>limit exceeded, try again later</ErrorText> : null }
                  <ForgotPassButton onPress={this.sendEmailHandler}>
                    <Text style={{color: 'white'}}>Send Email</Text>
                  </ForgotPassButton>
                </CenterView>
              : null
            }

            <SignInButton onPress={() => this.handleSubmit()}>
              <SignInText>Sign In</SignInText>
            </SignInButton>
            <SignUpButton onPress={() => this.setState({modal: true})}>
              <SignUpText>Create an Account</SignUpText>
            </SignUpButton>
          </InfoView>
        </MainDiv>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
