import {
  ViewStyle,
  LayoutChangeEvent,
  ScrollView,
  ScrollViewProps as RNScrollViewProps,
  FlatListProps as RNFlatListProps,
} from 'react-native';
import {Route} from 'react-native-tab-view';

export type HeaderProps = {
  containerStyle?: ViewStyle;
  onLayout: (event: LayoutChangeEvent) => void;
  header: React.ReactElement;
};

export type ContainerProps = {
  header: React.ReactElement;
  renderTabScene: (route: Route) => JSX.Element | undefined;
};

export type TabContextType = Pick<
  ScrollViewProps,
  'onMomentumScrollEnd' | 'onMomentumScrollBegin' | 'onScrollEndDrag'
> & {
  trackRef: (key: string, ref: ScrollView) => void;
  scrollHandler: RNScrollViewProps['onScroll'];
  headerHeight: number;
  minHeight: number;
};

export type ScrollViewProps = {
  sceneKey: string;
  children?: React.ReactElement;
};

export type FlatListProps<T> = RNFlatListProps<T> & {
  sceneKey: string;
};
