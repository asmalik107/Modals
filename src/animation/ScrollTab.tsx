import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
  FadeInUp,
  FadeInDown,
  ReduceMotion,
  SlideInUp,
  SlideInDown,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {Route, TabView} from 'react-native-tab-view';
import {RenderSceneProps, renderTabScene} from '../tabs/TabViews';
import {useState} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Enter = FadeIn.duration(300);

const Exit = FadeOut.duration(300);

const CollapsibleHeader = () => {
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'first', title: 'First Route'},
    {key: 'second', title: 'Second Route'},
    {key: 'third', title: 'Third Route'},
  ]);

  const [index, setIndex] = useState(0);

  const [isHeaderOpen, setHeaderOpen] = useState(true);

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;

      runOnJS(setHeaderOpen)(scrollY.value < 30);
    },
  });

  const renderScene = ({route}: RenderSceneProps<Route>) => {
    const renderItem = renderTabScene(route);

    return (
      <Animated.ScrollView
        bounces={false}
        contentContainerStyle={[styles.scroll]}
        onScroll={onScroll}>
        {renderItem}
      </Animated.ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {isHeaderOpen && (
        <Animated.View style={styles.header} entering={Enter} exiting={Exit}>
          <Text style={styles.text}>Collapsible Header</Text>
        </Animated.View>
      )}
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
