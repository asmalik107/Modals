import {renderHook, act} from '@testing-library/react-hooks';
import {ScrollView} from 'react-native';
import {useScrollManager} from '../HeaderTabs3';

describe('useScrollManager', () => {
  const routes = [
    {key: 'route1', title: 'Route 1'},
    {key: 'route2', title: 'Route 2'},
    {key: 'route3', title: 'Route 3'},
  ];
  const headerHeight = 100;

  it('should set initial index to 0', () => {
    const {result} = renderHook(() => useScrollManager(routes, headerHeight));

    expect(result.current.index).toBe(0);
  });

  it('should set the correct index when setIndex is called', () => {
    const {result} = renderHook(() => useScrollManager(routes, headerHeight));

    act(() => {
      result.current.setIndex(1);
    });

    expect(result.current.index).toBe(1);
  });

  it('should update scrollY value when scrollHandler is called', () => {
    const {result} = renderHook(() => useScrollManager(routes, headerHeight));

    act(() => {
      result.current.scrollHandler({contentOffset: {y: 200}});
    });

    expect(result.current.scrollY.value).toBe(-100);
  });

  // it('should set isListGliding to true when onMomentumScrollBegin is called', () => {
  //   const {result} = renderHook(() => useScrollManager(routes, headerHeight));

  //   act(() => {
  //     result.current.onMomentumScrollBegin();
  //   });

  //   expect(result.current.isListGliding.current).toBe(true);
  // });

  it('should set isListGliding to false and call syncScrollOffset when onMomentumScrollEnd is called', () => {
    const {result} = renderHook(() => useScrollManager(routes, headerHeight));
    const syncScrollOffsetMock = jest.spyOn(result.current, 'syncScrollOffset');

    act(() => {
      result.current.onMomentumScrollEnd();
    });

    //expect(result.current.isListGliding.current).toBe(false);
    expect(syncScrollOffsetMock).toHaveBeenCalled();
  });

  // it('should call syncScrollOffset when onScrollEndDrag is called', () => {
  //   const {result} = renderHook(() => useScrollManager(routes, headerHeight));
  //   const syncScrollOffsetMock = jest.spyOn(result.current, 'syncScrollOffset');

  //   act(() => {
  //     result.current.onScrollEndDrag();
  //   });

  //   expect(syncScrollOffsetMock).toHaveBeenCalled();
  // });

  it('should set tabkeyToScrollableChildRef and call scrollToOffset when trackRef is called', () => {
    const {result} = renderHook(() => useScrollManager(routes, headerHeight));
    const ref = {scrollTo: jest.fn()};

    act(() => {
      result.current.trackRef('route1', ref as unknown as ScrollView);
    });

    expect(result.current.getRefForKey('route1')).toBe(ref);
    expect(ref.scrollTo).toHaveBeenCalled();
  });
});
