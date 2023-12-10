import {View, Text, StyleSheet} from 'react-native';
import data from '../data/data.json';
import {
  Route,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';

const styles = StyleSheet.create({
  first: {
    flex: 1,
    backgroundColor: '#ff4081',
  },
  second: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
  third: {
    flex: 1,
    backgroundColor: '#123ab7',
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    fontSize: 20,
    marginBottom: 8,
    color: 'white',
  },
  header: {
    padding: 16,
  },
});

export type TabBarProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
};

export type RenderSceneProps<T extends Route> = SceneRendererProps & {route: T};

export const FirstRoute = () => (
  <View style={[styles.first, styles.contentContainer]}>
    {data.map(item => (
      <Text key={item} style={styles.content}>
        {item}
      </Text>
    ))}
  </View>
);

export const SecondRoute = () => (
  <View style={styles.second}>
    <Text>Second</Text>
  </View>
);
export const ThirdRoute = () => <View style={styles.third} />;

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text>This</Text>
      <Text>is</Text>
      <Text>a</Text>
      <Text>Header</Text>
    </View>
  );
};

export const renderTabScene = (route: Route) => {
  let renderItem;
  switch (route.key) {
    case 'first':
      renderItem = <FirstRoute />;
      break;
    case 'second':
      renderItem = <SecondRoute />;
      break;
    case 'third':
      renderItem = <ThirdRoute />;
      break;
    default:
      null;
  }

  return renderItem;
};
