import glamourous from 'glamorous-native';

import { blue1, gray1 } from '../../helpers/colors';

export const Columns = glamourous.view({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  paddingTop: 15,
  paddingBottom: 15,
  backgroundColor: `${blue1}`,
});

export const ColumnName = glamourous.text({
  width: '100%',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
});

interface IPlatformBox {
  colored?: boolean;
}

const dynamicStyles = (props: IPlatformBox) => ({
  backgroundColor: props.colored ? `${gray1}` : 'white',
});

export const TableEntry = glamourous.touchableOpacity(
  dynamicStyles, {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
});

export const Name = glamourous.text({
  width: '50%',
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
});

export const WrapperBox50 = glamourous.touchableOpacity({
  width: '50%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const WrapperBox = glamourous.view({
  width: '25%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const WrapperBoxTouchable = glamourous.touchableOpacity({
  width: '25%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const PlatformBox = glamourous.text({
  fontSize: 12,
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 3,
  borderWidth: 2,
  borderRadius: 3,
  borderColor: `${blue1}`,
  backgroundColor: `${blue1}`,
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'white',
});

export const RelDateBox = glamourous.text({
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
});

export const WhiteScreen = glamourous.view({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
});

export const LoaderView = glamourous.view({
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
