import {
  ParamListBase,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';

export default interface NavigationOptionProps {
  route?: RouteProp<ParamListBase, string>;
  navigation?: NavigationProp<any, any>;
}
