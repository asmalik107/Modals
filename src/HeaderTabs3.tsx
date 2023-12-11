import {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
  type ViewStyle,
  Platform,
} from 'react-native';
import {TabView, TabBar, Route, TabBarProps} from 'react-native-tab-view';
import {useSize} from './hooks/useSize';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RenderSceneProps, Header, renderTabScene} from './Tabs/TabViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    top: 0,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  indicatorStyle: {
    backgroundColor: 'white',
  },
  tabStyle: {
    backgroundColor: 'pink',
  },
  tabBar: {
    zIndex: 10,
  },
  scroll: {
    flexGrow: 1,
    // paddingBottom: 48,
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

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First Route'},
    {key: 'second', title: 'Second Route'},
    {key: 'third', title: 'Third Route'},
  ]);

  const [size, onLayout] = useSize();

  console.log(size);

  const headerHeight = size?.height ?? 0;

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
      {extrapolateLeft: Extrapolation.CLAMP},
    );

    return {transform: [{translateY}]};
  });

  const animatedTabBarStyle = useAnimatedStyle(() => {
    if (!size) return {};

    const opacity = interpolate(
      translationY.value,
      [headerHeight, headerHeight + 20],
      [0, 1],
      {extrapolateRight: Extrapolation.CLAMP},
    );

    const translateY = interpolate(
      translationY.value,
      [0, headerHeight],
      [headerHeight, 0],
      Extrapolation.CLAMP,
    );

    return {transform: [{translateY}]};
  });

  const renderTabBar = (props: TabBarProps<Route>) => (
    <Animated.View style={[styles.tabBar, animatedTabBarStyle]}>
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabStyle}
      />
    </Animated.View>
  );

  const renderScene = ({route}: RenderSceneProps<Route>) => {
    const renderItem = renderTabScene(route);

    return (
      <Animated.ScrollView
        // style={{ marginBottom: 48 }}
        bounces={false}
        contentContainerStyle={styles.scroll}
        onScroll={scrollHandler}
        contentInset={Platform.select({ios: {top: headerHeight}})}
        contentOffset={Platform.select({
          ios: {
            x: 0,
            y: -headerHeight,
          },
        })}>
        {renderItem}
      </Animated.ScrollView>
    );
  };

  return (
    <View style={[styles.container]}>
      <AnimatedHeader
        containerStyle={animatedHeaderStyle}
        onLayout={onLayout}
      />
      <TabView
        lazy
        // style={{flex: 1}}
        //sceneContainerStyle={{backgroundColor: 'green'}}
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
