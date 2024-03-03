import {FC, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {TabView, TabBar, Route, TabBarProps} from 'react-native-tab-view';
import {useSize} from '../../hooks/useSize';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {RenderSceneProps} from '../TabViews';
import {useScrollManager} from './hooks/useScrollManager';
import {ContainerProps, HeaderProps} from './types';
import {TabsContext} from './Context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // alignItems: 'center',
    backgroundColor: 'lightblue',
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
});

const AnimatedHeader: FC<HeaderProps> = ({
  containerStyle,
  onLayout,
  header,
}) => {
  return (
    <Animated.View style={[styles.header, containerStyle]} onLayout={onLayout}>
      {header}
    </Animated.View>
  );
};

export const Container: FC<ContainerProps> = ({header, renderTabScene}) => {
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
    return renderTabScene(route);
  };

  return (
    <TabsContext.Provider
      value={{
        trackRef,
        scrollHandler,
        headerHeight,
        minHeight: layout.height,
        ...sceneProps,
      }}>
      <View style={[styles.container]}>
        <AnimatedHeader
          containerStyle={animatedHeaderStyle}
          onLayout={onLayout}
          header={header}
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
    </TabsContext.Provider>
  );
};
