import {FC, useState} from 'react';
import {
  View,
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
import {useSize} from './hooks/useSize';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Header, renderTabScene} from './Tabs/TabViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
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

const AnimatedHeader: FC<HeaderProps> = ({containerStyle, onLayout}) => {
  return (
    <Animated.View style={[styles.header, containerStyle]} onLayout={onLayout}>
      <Header />
    </Animated.View>
  );
};

type TabBarProps<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
};

type RenderSceneProps<T extends Route> = SceneRendererProps & {route: T};

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First Route'},
    {key: 'second', title: 'Second Route'},
    {key: 'third', title: 'Third Route'},
  ]);

  const [size, onLayout] = useSize();

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
      scrollEnabled
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabStyle}
    />
  );

  const renderScene = ({route}: RenderSceneProps<Route>) => {
    const renderItem = renderTabScene(route);

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
      <AnimatedHeader
        containerStyle={animatedHeaderStyle}
        onLayout={onLayout}
      />
      <TabView
        lazy
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
