import Animated from 'react-native-reanimated';
import {FlatListProps} from './types';
import {FC} from 'react';

export const FlatList: FC<FlatListProps<unknown>> = ({sceneKey, ...props}) => {
  const {trackRef, scrollHandler, headerHeight, minHeight, sceneProps} =
    useTabsContext();

  return <Animated.FlatList {...props} />;
};
