import {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  TabView,
  TabBar,
  NavigationState,
  SceneRendererProps,
  Route,
} from 'react-native-tab-view';
import data from './data/data.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  header: {
    backgroundColor: 'lightblue',
    padding: 16,
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  content: {
    fontSize: 20,
    marginBottom: 8,
    color: 'white',
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabStyle: {
    backgroundColor: 'pink',
  },
});

const Header = () => {
  return (
    <View style={styles.header}>
      <Text>This</Text>
      <Text>is</Text>
      <Text>a</Text>
      <Text>Header</Text>
    </View>
  );
};

const FirstRoute = () => (
  <View style={[styles.first, styles.contentContainer]}>
    {data.map(item => (
      <Text key={item} style={styles.content}>
        {item}
      </Text>
    ))}
  </View>
);

const SecondRoute = () => (
  <View style={styles.second}>
    <Text>Second</Text>
  </View>
);
const ThirdRoute = () => <View style={styles.third} />;

type TabBarProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
};

type RenderSceneProps<T extends Route> = SceneRendererProps & {route: T};

const renderTabBar = (props: TabBarProps<Route>) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.tabStyle}
  />
);

const renderScene = ({route}: RenderSceneProps<Route>) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderItem}
    </ScrollView>
  );
};

const HeaderTabs: FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);

  return (
    <View style={styles.container}>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        // initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default HeaderTabs;
