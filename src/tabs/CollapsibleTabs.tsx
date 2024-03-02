import {Route} from 'react-native-tab-view';
import {Tabs} from './collapsible';
import {FirstRoute, Header, SecondRoute, ThirdRoute} from './TabViews';

export const renderTabScene = (route: Route) => {
  let renderItem;
  switch (route.key) {
    case 'first':
      renderItem = (
        <Tabs.ScrollView sceneKey={route.key}>
          <FirstRoute />
        </Tabs.ScrollView>
      );
      break;
    case 'second':
      renderItem = (
        <Tabs.ScrollView sceneKey={route.key}>
          <SecondRoute />
        </Tabs.ScrollView>
      );
      break;
    case 'third':
      renderItem = (
        <Tabs.ScrollView sceneKey={route.key}>
          <ThirdRoute />
        </Tabs.ScrollView>
      );
      break;
    default:
      null;
  }

  return renderItem;
};

export const CollapsibleTabs = () => {
  return <Tabs.Container header={<Header />} renderTabScene={renderTabScene} />;
};

export default CollapsibleTabs;
