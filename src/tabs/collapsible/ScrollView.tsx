import {Platform, StyleSheet} from 'react-native';
import {useTabsContext} from './Context';
import {FC} from 'react';
import Animated from 'react-native-reanimated';

type ScrollViewProps = {
  sceneKey: string;
  children?: React.ReactElement;
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
});

export const ScrollView: FC<ScrollViewProps> = ({sceneKey, children}) => {
  const {trackRef, scrollHandler, headerHeight, minHeight, ...rest} =
    useTabsContext();

  return (
    <Animated.ScrollView
      // style={{ marginBottom: 48 }}
      ref={(ref: Animated.ScrollView) => {
        trackRef(sceneKey, ref);
      }}
      {...rest}
      bounces={false}
      contentContainerStyle={[
        styles.scroll,
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
      })}>
      {children}
    </Animated.ScrollView>
  );
};
