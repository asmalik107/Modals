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
    alignItems: 'center',
  },
  innerHeader: {
    padding: 16,
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
      <View style={styles.innerHeader}>
        <Text>This</Text>
        <Text>is</Text>
        <Text>a</Text>
        <Text>Header</Text>
      </View>
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

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);

  const [size, onLayout] = useSize();

  console.log('size', size);

  const headerHeight = size?.height ?? 0;
  const minHeaderHeight = 64;

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    if (!size) return {};

    const translateY = interpolate(
      translationY.value,
      [0, headerHeight],
      [0, -headerHeight],
      Extrapolation.CLAMP,
    );
    const height = interpolate(
      translationY.value,
      [-headerHeight, 0, headerHeight],
      [100, headerHeight, 0],
      Extrapolation.CLAMP,
    );
    return {height, transform: [{translateY}]};
  });

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
      <Animated.ScrollView
        bounces={false}
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
