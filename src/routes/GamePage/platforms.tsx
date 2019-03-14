import * as React from 'react';
import { View } from 'react-native';

import { PlatformBox } from './styles';

interface IPlatStates {
  selected: boolean;
}

interface IPlatProps {
  platform: string;
  check: string;
}

class PlatformRender extends React.Component<IPlatProps, IPlatStates> {
  constructor(props: IPlatProps) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  public selectHandler = () => {
    this.setState({ selected: !this.state.selected });
  }

  public render() {
    return (
      <View>
        <PlatformBox selected={ this.props.platform === this.props.check }>
          { this.props.children }
        </PlatformBox>
      </View>
    );
  }
}

export default PlatformRender;
