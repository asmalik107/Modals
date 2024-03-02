import {
  ViewStyle,
  LayoutChangeEvent,
  ScrollView,
  ScrollViewProps,
} from 'react-native';

export type HeaderProps = {
  containerStyle?: ViewStyle;
  onLayout: (event: LayoutChangeEvent) => void;
  header: React.ReactElement;
};

export type ContainerProps = {
  header: React.ReactElement;
};

export type TabContextType = {
  trackRef: (key: string, ref: ScrollView) => void;
  scrollHandler: ScrollViewProps['onScroll'];
  headerHeight: number;
  minHeight: number;
};
