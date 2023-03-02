import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RouteParamList, RootAllMixedParamList} from './navigator/types';

/*
const navigation = navigationRef.current;
  let rootState = JSON.parse(JSON.stringify(navigation.getRootState()));
  // rootState.routes = [
  //   ...rootState.routes.map(route => {
  //     return {
  //       name: route.name,
  //       state: {...route.state},
  //     };
  //   }),
  // ];
  rootState.routes.push(...actions);
  const newAction = CommonActions.reset({
    index: rootState.routes.length - 1,
    routes: rootState.routes,
  });
  // const state = navigation.getState();
  navigation.dispatch(newAction);

*/

class RootNavigation {
  private constructor() {}

  static navigation = createNavigationContainerRef<RootAllMixedParamList>();

  static navigate = (
    name: keyof RootAllMixedParamList,
    params?: StackScreenProps<RootAllMixedParamList>['route']['params'],
  ) => {
    if (RootNavigation.navigation.isReady()) {
      // @ts-ignore
      RootNavigation.navigation.navigate(name, params);
    }
  };

  static replace = (
    name: keyof RootAllMixedParamList,
    params?: RouteParamList,
  ) => {
    const navigation = RootNavigation.navigation;
    navigation.dispatch(StackActions.replace(name, params));
  };

  static resetRoot = (actions = []) => {
    const navigation = RootNavigation.navigation;
    // const rootState = navigation.getRootState();
    // const state = navigation.getState();
    navigation.dispatch(state => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.routes.push(...actions);
      return CommonActions.reset({
        ...newState,
        index: newState.routes.length - 1,
        routes: newState.routes,
      });
    });
  };
}

export default RootNavigation;
