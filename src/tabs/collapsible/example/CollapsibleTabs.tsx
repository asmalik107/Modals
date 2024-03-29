import {Route} from 'react-native-tab-view';
import {Tabs} from '..';
import {ThirdRoute} from '../../TabViews';
import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    borderColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
  },
  header: {
    backgroundColor: 'green',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    width: 300,
    pointerEvents: 'none',
  },
});

type TestData = {
  id: number;
  title: string;
  subtitle: string;
};

const generateObjectList = (
  count: number,
  type: 'FlatList' | 'ScrollView' | 'FlashList' = 'ScrollView',
): TestData[] => {
  return Array.from({length: count}, (_, index) => ({
    id: index + 1,
    title: `${type} Title ${index + 1}`,
    subtitle: `SubTitle ${index + 1}`,
  }));
};

export const scrollData: TestData[] = generateObjectList(20);
export const ListData: TestData[] = generateObjectList(30, 'FlatList');
export const FlashListData: TestData[] = generateObjectList(30, 'FlashList');

export const Card: FC<TestData> = ({title, subtitle}) => {
  return (
    <View accessible style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export const renderTabScene = (route: Route) => {
  let renderItem;
  switch (route.key) {
    case 'first':
      renderItem = (
        <Tabs.FlatList
          sceneKey={route.key}
          data={ListData}
          renderItem={({item}) => <Card {...item} />}
        />
      );
      break;
    case 'second':
      renderItem = (
        <Tabs.ScrollView sceneKey={route.key}>
          <>
            {scrollData.map(item => (
              <Card key={item.id} {...item} />
            ))}
          </>
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

export const Header = () => {
  return (
    <View style-={styles.header} pointerEvents="box-none">
      <View accessible style={styles.card} pointerEvents="box-none">
        <Text>Header 1</Text>
        <Text>Content</Text>
      </View>
      <View accessible style={styles.card} pointerEvents="box-none">
        <Text>Header 2</Text>
        <Text>Content</Text>
      </View>
    </View>
  );
};

export const CollapsibleTabs = () => {
  return <Tabs.Container header={<Header />} renderTabScene={renderTabScene} />;
};

export default CollapsibleTabs;
