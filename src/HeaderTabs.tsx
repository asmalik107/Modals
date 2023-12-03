import {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
  type ViewStyle,
} from 'react-native';
import {
  TabView,
  TabBar,
  NavigationState,
  SceneRendererProps,
  Route,
} from 'react-native-tab-view';
import data from './data/data.json';
import {useSize} from './hooks/useSize';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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
  scroll: {
    flexGrow: 1,
  },
});

type HeaderProps = {
  containerStyle?: ViewStyle;
  onLayout: (event: LayoutChangeEvent) => void;
};

const Header: FC<HeaderProps> = ({containerStyle, onLayout}) => {
  return (
    <Animated.View style={[styles.header, containerStyle]} onLayout={onLayout}>
      <Text>This</Text>
      <Text>is</Text>
      <Text>a</Text>
      <Text>Header</Text>
    </Animated.View>
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

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);

  const [size, onLayout] = useSize();

  const headerHeight = size?.height ?? 0;
  const minHeaderHeight = 64;

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    // opacity: interpolate(
    //   translationY.value,
    //   [0, headerHeight],
    //   [0, 1],
    //   Extrapolation.CLAMP,
    // ),
    transform: [
      {
        translateY: interpolate(
          translationY.value,
          [0, headerHeight],
          [0, -headerHeight],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

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
      <Animated.ScrollView
        contentContainerStyle={styles.scroll}
        onScroll={scrollHandler}>
        {renderItem}
      </Animated.ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header containerStyle={animatedHeaderStyle} onLayout={onLayout} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default HeaderTabs;
