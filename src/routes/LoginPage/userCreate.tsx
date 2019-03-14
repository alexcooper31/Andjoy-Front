import { Auth } from 'aws-amplify';
import * as React from 'react';
import { ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MainDiv } from '../GamePage/styles';
import {
  BackButton,
  InfoView,
  InputView,
  SignInButton,
  SignInText,
  StyledInput,
  Title,
  UnderInputText,
  UnderInputView,
} from './styles';

interface IValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorUsername: boolean;
  errorEmail: boolean;
  errorPassword: boolean;
  errorConfirmPassword: boolean;
}

interface IProps {
  close: any;
}

class UserCreate extends React.Component<IProps, IValues> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorUsername: false,
      errorEmail: false,
      errorPassword: false,
      errorConfirmPassword: false,
    };
  }

  public handleSubmit = async () => {
    const {
      username,
      email,
      password,
      confirmPassword,
    } = this.state;

    if (password === confirmPassword) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
          validationData: [],
        });
        this.props.close();
        ToastAndroid.showWithGravity('Account Created! You can login now.', ToastAndroid.SHORT, ToastAndroid.TOP);
      } catch (e) {
        if (e.code === 'UsernameExistsException') {
          this.setState({ errorUsername: true });
        } else if (e.message === 'Invalid email address format.') {
          this.setState({ errorEmail: true });
        } else if (e.message.includes('greater than or equal to 6')) {
            this.setState({ errorPassword: true });
          }
      }
    } else {
      this.setState({errorConfirmPassword: true});
    }
  }

  public handleUsername = (text: string) => {
    this.setState({ username: text, errorUsername: false });
  }

  public handleEmail = (text: string) => {
    this.setState({ email: text, errorEmail: false });
  }

  public handlePassword = (text: string) => {
    this.setState({ password: text, errorPassword: false });
  }

  public handleConfirmPassword = (text: string) => {
    this.setState({ confirmPassword: text, errorConfirmPassword: false });
  }

  public render() {
    return (
      <MainDiv>
        <BackButton onPress={() => this.props.close()}>
          <Icon name='chevron-left' color='#ffffff' size={48} />
        </BackButton>
        <InfoView>
          <Title>Create Account</Title>
          <InputView error={this.state.errorUsername}>
            <StyledInput
              style={{ width: '100%' }}
              onChangeText={this.handleUsername}
              placeholder='Username'
              placeholderTextColor='lightgray'
            />
          </InputView>
          {
            this.state.errorUsername
            ? <UnderInputView>
                <UnderInputText style={{color: 'red'}}>Username already exists!</UnderInputText>
              </UnderInputView>
            : null
          }
          <InputView error={this.state.errorEmail} style={{marginTop: 30}}>
            <StyledInput
              style={{ width: '100%' }}
              onChangeText={this.handleEmail}
              placeholder='Email'
              placeholderTextColor='lightgray'
              keyboardType='email-address'
            />
          </InputView>
          {
            this.state.errorEmail
            ? <UnderInputView>
                <UnderInputText style={{color: 'red'}}>Not a valid email address!</UnderInputText>
              </UnderInputView>
            : null
          }
          <InputView error={this.state.errorPassword} style={{marginTop: 30}}>
            <StyledInput
              style={{ width: '100%' }}
              onChangeText={this.handlePassword}
              secureTextEntry
              placeholder='Password'
              placeholderTextColor='lightgray'
            />
          </InputView>
          {
            this.state.errorPassword
            ? <UnderInputView>
                <UnderInputText style={{color: 'red'}}>Password has less than 6 characters!</UnderInputText>
              </UnderInputView>
            : null
          }
          <InputView error={this.state.errorConfirmPassword} style={{marginTop: 30}}>
            <StyledInput
              style={{ width: '100%' }}
              onChangeText={this.handleConfirmPassword}
              secureTextEntry
              placeholder='Repeat Password'
              placeholderTextColor='lightgray'
            />
          </InputView>
          {
            this.state.errorConfirmPassword
            ? <UnderInputView>
                <UnderInputText style={{color: 'red'}}>Password does not match!</UnderInputText>
              </UnderInputView>
            : null
          }

          <SignInButton onPress={() => this.handleSubmit()}>
            <SignInText>Sign Up</SignInText>
          </SignInButton>
        </InfoView>
      </MainDiv>
    );
  }
}

export default UserCreate;
