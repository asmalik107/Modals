import {useState, useRef, useEffect} from 'react';
import {Platform, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

export const useScrollManager = (
  routes: {key: string; title: string}[],
  headerHeight: number,
) => {
  const tabViewOffset = Platform.OS === 'ios' ? -headerHeight : 0;
  const scrollY = useSharedValue(-headerHeight);
  const [index, setIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  }, []);

  const isListGliding = useRef(false);
  const tabkeyToScrollPosition = useRef<{[key: string]: number}>({}).current;
  const tabkeyToScrollableChildRef = useRef<{
    [key: string]: ScrollView | FlatList;
  }>({}).current;

  useEffect(() => {
    const curRoute = routes[index].key;
    tabkeyToScrollPosition[curRoute] = scrollY.value;
  }, [index, headerHeight, scrollY, routes, tabkeyToScrollPosition]);

  const scrollToOffset = (
    scrollRef: ScrollView | FlatList,
    key: string,
    scrollValue: number,
  ) => {
    /* header visible */
    if (scrollValue <= tabViewOffset + headerHeight) {
      scrollRef.scrollTo({
        y: Math.max(
          Math.min(scrollValue, tabViewOffset + headerHeight),
          tabViewOffset,
        ),
        animated: false,
      });
      // scrollRef.scrollToOffset({
      //   offset: Math.max(
      //     Math.min(scrollValue, tabViewOffset + headerHeight),
      //     tabViewOffset,
      //   ),
      //   animated: false,
      // });
      tabkeyToScrollPosition[key] = scrollValue;
    } else if (
      /* header hidden */
      tabkeyToScrollPosition[key] < tabViewOffset + headerHeight ||
      tabkeyToScrollPosition[key] == null
    ) {
      // scrollRef.scrollToOffset({
      //   offset: tabViewOffset + headerHeight,
      //   animated: false,
      // });
      scrollRef.scrollTo({
        y: tabViewOffset + headerHeight,
        animated: false,
      });
      tabkeyToScrollPosition[key] = tabViewOffset + headerHeight;
    }
  };

  const syncScrollOffset = () => {
    const curRouteKey = routes[index].key;
    const scrollValue = scrollY.value;

    Object.keys(tabkeyToScrollableChildRef).forEach(key => {
      const scrollRef = tabkeyToScrollableChildRef[key];
      if (!scrollRef) {
        return;
      }

      if (key !== curRouteKey) {
        scrollToOffset(scrollRef, key, scrollValue);
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const trackRef = (key: string, ref: ScrollView | FlatList) => {
    if (ref) {
      tabkeyToScrollableChildRef[key] = ref;
      scrollToOffset(ref, key, scrollY.value);
    }
  };

  const getRefForKey = (key: string) => tabkeyToScrollableChildRef[key];

  return {
    index,
    getRefForKey,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    setIndex,
    scrollHandler,
    scrollY,
    tabViewOffset,
    trackRef,
  };
};
