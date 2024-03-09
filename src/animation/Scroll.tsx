import {View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const CollapsibleHeader = () => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerHeight = useAnimatedStyle(() => {
    console.log(scrollY.value);
    return {
      height: interpolate(scrollY.value, [0, 100], [200, 0], Extrapolate.CLAMP),
    };
  });

  const renderItem = ({item}) => (
    <View
      style={{padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          {
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
          },
          headerHeight,
        ]}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Collapsible Header
        </Text>
      </Animated.View>
      <Animated.FlatList
        data={Array.from({length: 15}, (_, i) => `Item ${i + 1}`)}
        renderItem={renderItem}
        keyExtractor={item => item}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default CollapsibleHeader;
