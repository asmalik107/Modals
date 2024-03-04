import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from 'react-native-collapsible-tab-view';
import {
  Card,
  Header,
  ListData,
  scrollData,
} from './tabs/collapsible/example/CollapsibleTabs';
import {useState} from 'react';
import {View} from 'react-native';

const HEADER_HEIGHT = 100;

// const styles = StyleSheet.create({
//   boxA: {
//     backgroundColor: 'white',
//   },
//   boxB: {
//     backgroundColor: '#D8D8D8',
//   },
//   box: {
//     flex: 1,
//   },
// });

function TabsComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      onTabChange={({index}) => setSelectedIndex(index)}
      renderTabBar={props => (
        <View accessibilityRole="tablist">
          <MaterialTabBar
            {...props}
            // eslint-disable-next-line react/no-unstable-nested-components
            TabItemComponent={p => {
              return (
                <MaterialTabItem
                  {...p}
                  accessibilityLabel={`${p.name}, ${p.index + 1} of 3`}
                  accessibilityRole="tab"
                  accessibilityState={{selected: p.index === selectedIndex}}
                />
              );
            }}
          />
        </View>
      )}>
      <Tabs.Tab name="First">
        <Tabs.FlatList
          data={ListData}
          renderItem={({item}) => <Card {...item} />}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Second">
        <Tabs.ScrollView>
          {scrollData.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Third">
        <Tabs.FlatList
          data={ListData}
          renderItem={({item}) => <Card {...item} />}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
}

export default TabsComponent;
