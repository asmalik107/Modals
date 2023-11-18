import {StyleSheet, View} from 'react-native';
import {
  MaterialTabBar,
  MaterialTabItem,
  Tabs,
} from 'react-native-collapsible-tab-view';

const HEADER_HEIGHT = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
    pointerEvents: 'none',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  box: {
    flex: 1,
  },
});

const Header = () => {
  return <View style={styles.header} />;
};

function TabsComponent() {
  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          // eslint-disable-next-line react/no-unstable-nested-components
          TabItemComponent={p => {
            return (
              <MaterialTabItem
                {...p}
                accessibilityLabel="Test"
                accessibilityRole="tab"
              />
            );
          }}
        />
      )}>
      <Tabs.Tab name="A">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

export default TabsComponent;
