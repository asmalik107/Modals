import {renderHook, act} from '@testing-library/react-hooks';
import {useSize} from '../useSize';

describe('useSize', () => {
  test('should update size on layout change', () => {
    const {result} = renderHook(() => useSize());

    act(() => {
      result.current[1]({
        nativeEvent: {
          layout: {
            width: 100,
            height: 200,
            x: 0,
            y: 0,
          },
        },
        currentTarget: 0,
        target: 0,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: function (): void {
          throw new Error('Function not implemented.');
        },
        isDefaultPrevented: function (): boolean {
          throw new Error('Function not implemented.');
        },
        stopPropagation: function (): void {
          throw new Error('Function not implemented.');
        },
        isPropagationStopped: function (): boolean {
          throw new Error('Function not implemented.');
        },
        persist: function (): void {
          throw new Error('Function not implemented.');
        },
        timeStamp: 0,
        type: '',
      });
    });

    expect(result.current[0]).toEqual({width: 100, height: 200});
  });
});
