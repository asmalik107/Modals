import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {Route, TabView} from 'react-native-tab-view';
import {RenderSceneProps, renderTabScene} from '../tabs/TabViews';
import {useRef, useState} from 'react';
import {useSize} from '../hooks/useSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },
});

const CollapsibleHeader = () => {
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'First Route'},
    {key: 'second', title: 'Second Route'},
    {key: 'third', title: 'Third Route'},
  ]);

  const [index, setIndex] = useState(0);

  // const [size, onLayout] = useSize();
  // const headerHeight = size?.height ?? 0;

  const headerRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const isHeaderOpen = useSharedValue(true);

  // const onLayout = event => {
  //   setHeaderHeight(event.nativeEvent.layout.height);
  // };

  console.log('headerHeight', headerHeight);

  const onLayout = () => {
    headerRef.current.measure((x, y, width, height) => {
      setHeaderHeight(height);

      console.log('onLayout', height);
    });
  };

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleScroll = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isClosed = currentScrollY > headerHeight; // Adjust the threshold as needed

    if (isHeaderOpen.value !== isClosed) {
      isHeaderOpen.value = !isClosed;
    }
  };

  const animatedHeaderStyle = useAnimatedStyle(() => {
    console.log(scrollY.value);
    if (isHeaderOpen.value && headerHeight === 0) {
      return {};
    }

    return {
      height: interpolate(
        scrollY.value,
        [0, 10],
        [headerHeight, 0],
        Extrapolate.CLAMP,
      ),
    };
  });

  const renderScene = ({route}: RenderSceneProps<Route>) => {
    const renderItem = renderTabScene(route);

    return (
      <Animated.ScrollView
        bounces={false}
        contentContainerStyle={[styles.scroll]}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScroll}>
        <Text>{isHeaderOpen ? 'Close Header' : 'Open Header'}</Text>
        {renderItem}
      </Animated.ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View ref={headerRef} onLayout={onLayout}>
        <Animated.View
          //          onLayout={onLayout}
          style={[
            {
              backgroundColor: 'lightblue',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            },
            animatedHeaderStyle,
          ]}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Collapsible Header
          </Text>
        </Animated.View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        //renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default CollapsibleHeader;
