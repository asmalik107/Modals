import {createContext, useContext} from 'react';
import {TabContextType} from './types';

export const TabsContext = createContext<TabContextType | undefined>(undefined);

export function useTabsContext(): TabContextType {
  const c = useContext(TabsContext);
  if (!c) throw new Error('useTabsContext must be inside a Tabs.Container');
  return c;
}
