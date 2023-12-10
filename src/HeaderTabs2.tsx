import {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

import {useSize} from './hooks/useSize';
import {SizableText, Tabs, TabsContentProps} from 'tamagui';
import {FirstRoute, SecondRoute} from './Tabs/TabViews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: 'lightblue',
    padding: 16,
    alignItems: 'center',
  },
});

type HeaderProps = {
  onLayout: (event: LayoutChangeEvent) => void;
};

const Header: FC<HeaderProps> = ({onLayout}) => {
  return (
    <View style={[styles.header]} onLayout={onLayout}>
      <Text>This</Text>
      <Text>is</Text>
      <Text>a</Text>
      <Text>Header</Text>
    </View>
  );
};

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}>
      {props.children}
    </Tabs.Content>
  );
};

const HeaderTabs: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);

  const [size, onLayout] = useSize();

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[1]}>
      <Header onLayout={onLayout} />
      <Tabs
        defaultValue="tab1"
        width={layout.width}
        orientation="horizontal"
        flexDirection="column">
        <Tabs.List>
          <Tabs.Tab value="tab1">
            <SizableText>Tab 1</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <SizableText>Tab 2</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <TabsContent value="tab1">
          <FirstRoute />
        </TabsContent>
        <TabsContent value="tab2">
          <SecondRoute />
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
};

export default HeaderTabs;
