import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import {Route, TabView} from 'react-native-tab-view';
import {RenderSceneProps, renderTabScene} from '../tabs/TabViews';
import {useEffect, useState} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'lightblue',
    padding: 10,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    borderColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

const Enter = FadeInUp.duration(300);

const Exit = FadeOutDown.duration(300);

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Creating a timeout within the useEffect hook
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

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
          <View style-={styles.header} pointerEvents="box-none">
            {!isLoading && (
              <View accessible style={styles.card} pointerEvents="box-none">
                <Text>Header 1</Text>
                <Text>Content</Text>
              </View>
            )}
            <View accessible style={styles.card} pointerEvents="box-none">
              <Text>Header 2</Text>
              <Text>Content</Text>
            </View>
          </View>
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
