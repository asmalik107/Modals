import {useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

type Size = {
  height: number;
  width: number;
} | null;

export const useSize = (): [Size, (event: LayoutChangeEvent) => void] => {
  const [size, setSize] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};
