import { Auth } from 'aws-amplify';
import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Text, ToastAndroid } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import {
  CenterView,
  CodeInput,
  CodeView,
  ErrorText,
  InfoButton,
  InfoText,
  InfoWrapper,
  MainDiv,
  OptionButton,
  StyledInput,
} from './styles';

interface ISettingsProps {
  navigation: NavigationScreenProp<any, any>;
}

interface ISettingsStates {
  user: any;
  userEmail: string;
  loading: boolean;
  oldPassword: string;
  newPasswordConfirm: string;
  newPassword: string;
  passwordConfirmError: boolean;
  passwordError: boolean;
  newPasswordError: boolean;
  emailError: boolean;
  codeModal: boolean;
  verificationCode: string;
  invalidCode: boolean;
}

class Settings extends React.Component<ISettingsProps, ISettingsStates> {
  constructor(props: ISettingsProps) {
    super(props);
    this.state = {
      user: '',
      userEmail: '',
      loading: false,
      oldPassword: '',
      newPasswordConfirm: '',
      newPassword: '',
      passwordConfirmError: false,
      passwordError: false,
      newPasswordError: false,
      emailError: false,
      codeModal: false,
      verificationCode: '',
      invalidCode: false,
    };
  }

  public async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({user, userEmail: user.attributes.email});
    } catch (e) {
      console.log(e);
    }
  }

  public changePasswordHandler = async () => {
    const { oldPassword, newPasswordConfirm, newPassword} = this.state;

    Keyboard.dismiss();
    if (newPassword === newPasswordConfirm) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, oldPassword, newPassword);
        ToastAndroid.showWithGravity('Password Changed!', ToastAndroid.SHORT, ToastAndroid.TOP);
        this.setState({oldPassword: '', newPasswordConfirm: '', newPassword: ''});
      } catch (e) {
        if (e.message === 'Incorrect username or password.') {
          this.setState({passwordError: true});
        } else if (e.message.includes('greater than or equal to 6')) {
          this.setState({newPasswordError: true});
        }
      }
    } else {
      this.setState({passwordConfirmError: true});
    }
  }

  public handleOldPassword = (text: string) => {
    this.setState({ oldPassword: text, passwordError: false, newPasswordError: false });
  }

  public handleNewPassword = (text: string) => {
    this.setState({ newPassword: text, passwordError: false, newPasswordError: false });
  }

  public handleNewConfirm = (text: string) => {
    this.setState({ newPasswordConfirm: text, passwordConfirmError: false });
  }

  public logOutHandler = async () => {
    try {
      await this.state.user.signOut();
      this.props.navigation.navigate('Login');
      ToastAndroid.showWithGravity('Logged Off.', ToastAndroid.SHORT, ToastAndroid.TOP);
    } catch (e) {
      this.setState({emailError: true});
    }
  }

  public emailHandler = (text: string) => {
    this.setState({userEmail: text, emailError: false});
  }

  public changeEmailHandler = async () => {
    const { user, userEmail } = this.state;

    try {
      await Auth.updateUserAttributes(user, {
        email: userEmail,
      });
      this.setState({ codeModal: true });
    } catch (e) {
      this.setState({ emailError: true });
    }
  }

  public verificationHandler = (text: string) => {
    this.setState({ verificationCode: text, invalidCode: false });
  }

  public verifyEmail = async () => {
    const { verificationCode } = this.state;

    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', verificationCode);
      ToastAndroid.showWithGravity('Email Changed!', ToastAndroid.SHORT, ToastAndroid.TOP);
      this.setState({ codeModal: false });
    } catch (e) {
      this.setState({ invalidCode: true });
    }
  }

  public render() {
    const {
      newPassword,
      oldPassword,
      newPasswordConfirm,
      newPasswordError,
      passwordConfirmError,
      passwordError,
      emailError,
      codeModal,
      invalidCode,
    } = this.state;

    return(
      <KeyboardAvoidingView style={{width: '100%'}} behavior='padding' enabled>

      <Modal
        animationType='slide'
        visible={codeModal}
        onRequestClose={() => this.setState({ codeModal: false })}
        transparent
      >
        <CenterView>
          <CodeView>
            <CodeInput placeholder='Verification Code' onChangeText={this.verificationHandler} />
            { invalidCode ? <ErrorText>Invalid Code</ErrorText> : null }
            <InfoButton onPress={() => this.verifyEmail()}>
              <Text style={{color: 'white'}}>Submit</Text>
            </InfoButton>
          </CodeView>
        </CenterView>
      </Modal>

      <MainDiv>
        <InfoWrapper>
          <InfoText>Change Password</InfoText>
          <StyledInput
            secureTextEntry
            value={oldPassword}
            placeholder='Old Password'
            onChangeText={this.handleOldPassword}
          />
          { passwordError ? <ErrorText>Wrong Password</ErrorText> : null }

          <StyledInput
            secureTextEntry
            value={newPassword}
            placeholder='New Password'
            onChangeText={this.handleNewPassword}
          />
          { newPasswordError ? <ErrorText>New Password has be at least 6 characters long</ErrorText> : null }

          <StyledInput
            secureTextEntry
            value={newPasswordConfirm}
            placeholder='Confirm New Password'
            onChangeText={this.handleNewConfirm}
          />
          { passwordConfirmError ? <ErrorText>Password does not match!</ErrorText> : null }
          <InfoButton onPress={() => this.changePasswordHandler()}>
            <Text style={{color: 'white'}}>Submit</Text>
          </InfoButton>
        </InfoWrapper>

        <InfoWrapper>
          <InfoText>Change Email</InfoText>
          <StyledInput value={this.state.userEmail} onChangeText={this.emailHandler} />
          { emailError ? <ErrorText>Invalid Email</ErrorText> : null }
          <InfoButton onPress={() => this.changeEmailHandler()}>
            <Text style={{color: 'white'}}>Send Verification Code</Text>
          </InfoButton>
        </InfoWrapper>

        <OptionButton onPress={() => this.logOutHandler()}>
          <Text style={{color: 'white'}}> Log Out </Text>
        </OptionButton>
      </MainDiv>
      </KeyboardAvoidingView>
    );
  }
}

export default Settings;
