import Animated from 'react-native-reanimated';
import {FlatListProps} from './types';
import {useTabsContext} from './Context';
import {Platform} from 'react-native';

export const FlatList = <T,>({sceneKey, ...props}: FlatListProps<T>) => {
  const {trackRef, scrollHandler, headerHeight, minHeight} = useTabsContext();

  return (
    <Animated.FlatList
      ref={(ref: Animated.FlatList<unknown>) => {
        trackRef(sceneKey, ref);
      }}
      {...props}
      bounces={false}
      contentContainerStyle={[
        Platform.select({
          android: {paddingTop: headerHeight, minHeight},
        }),
      ]}
      onScroll={scrollHandler}
      contentInset={Platform.select({ios: {top: headerHeight}})}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -headerHeight,
        },
      })}
    />
  );
};
