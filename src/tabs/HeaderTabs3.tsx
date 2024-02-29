import {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
  type ViewStyle,
  Platform,
  ScrollView,
} from 'react-native';
import {TabView, TabBar, Route, TabBarProps} from 'react-native-tab-view';
import {useSize} from '../hooks/useSize';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RenderSceneProps, Header, renderTabScene} from './TabViews';

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
    //zIndex: 2,
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

export const useScrollManager = (
  routes: {key: string; title: string}[],
  headerHeight: number,
) => {
  const tabViewOffset = Platform.OS === 'ios' ? -headerHeight : 0;
  const scrollY = useSharedValue(-headerHeight);
  const [index, setIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  }, []);

  const isListGliding = useRef(false);
  const tabkeyToScrollPosition = useRef<{[key: string]: number}>({}).current;
  const tabkeyToScrollableChildRef = useRef<{[key: string]: ScrollView}>(
    {},
  ).current;

  useEffect(() => {
    const curRoute = routes[index].key;
    tabkeyToScrollPosition[curRoute] = scrollY.value;
  }, [index, headerHeight, scrollY, routes, tabkeyToScrollPosition]);

  const scrollToOffset = (
    scrollRef: ScrollView,
    key: string,
    scrollValue: number,
  ) => {
    /* header visible */
    if (scrollValue <= tabViewOffset + headerHeight) {
      scrollRef.scrollTo({
        y: Math.max(
          Math.min(scrollValue, tabViewOffset + headerHeight),
          tabViewOffset,
        ),
        animated: false,
      });
      // scrollRef.scrollToOffset({
      //   offset: Math.max(
      //     Math.min(scrollValue, tabViewOffset + headerHeight),
      //     tabViewOffset,
      //   ),
      //   animated: false,
      // });
      tabkeyToScrollPosition[key] = scrollValue;
    } else if (
      /* header hidden */
      tabkeyToScrollPosition[key] < tabViewOffset + headerHeight ||
      tabkeyToScrollPosition[key] == null
    ) {
      // scrollRef.scrollToOffset({
      //   offset: tabViewOffset + headerHeight,
      //   animated: false,
      // });
      scrollRef.scrollTo({
        y: tabViewOffset + headerHeight,
        animated: false,
      });
      tabkeyToScrollPosition[key] = tabViewOffset + headerHeight;
    }
  };

  const syncScrollOffset = () => {
    const curRouteKey = routes[index].key;
    const scrollValue = scrollY.value;

    Object.keys(tabkeyToScrollableChildRef).forEach(key => {
      const scrollRef = tabkeyToScrollableChildRef[key];
      if (!scrollRef) {
        return;
      }

      if (key !== curRouteKey) {
        scrollToOffset(scrollRef, key, scrollValue);
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const trackRef = (key: string, ref: ScrollView) => {
    if (ref) {
      tabkeyToScrollableChildRef[key] = ref;
      scrollToOffset(ref, key, scrollY.value);
    }
  };

  const getRefForKey = (key: string) => tabkeyToScrollableChildRef[key];

  return {
    index,
    getRefForKey,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    setIndex,
    scrollHandler,
    scrollY,
    tabViewOffset,
    trackRef,
  };
};

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'First Route'},
    {key: 'second', title: 'Second Route'},
    {key: 'third', title: 'Third Route'},
  ]);

  const [size, onLayout] = useSize();

  const headerHeight = size?.height ?? 0;

  const {
    index,
    setIndex,
    scrollHandler,
    scrollY,
    tabViewOffset,
    getRefForKey,
    trackRef,
    ...sceneProps
  } = useScrollManager(routes, headerHeight);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    if (!size) return {};

    const translateY = interpolate(
      scrollY.value,
      [tabViewOffset, tabViewOffset + headerHeight],
      [0, -headerHeight],
      {extrapolateLeft: Extrapolation.CLAMP},
    );

    return {transform: [{translateY}]};
  });

  const animatedTabBarStyle = useAnimatedStyle(() => {
    if (!size) return {};

    const opacity = interpolate(
      scrollY.value,
      [headerHeight, headerHeight + 20],
      [0, 1],
      {extrapolateRight: Extrapolation.CLAMP},
    );

    const translateY = interpolate(
      scrollY.value,
      [tabViewOffset, tabViewOffset + headerHeight],
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
        ref={(ref: Animated.ScrollView) => {
          trackRef(route.key, ref);
        }}
        {...sceneProps}
        bounces={false}
        contentContainerStyle={[
          styles.scroll,
          Platform.select({
            android: {paddingTop: headerHeight, minHeight: layout.height},
          }),
        ]}
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
