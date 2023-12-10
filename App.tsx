import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Home';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TamaguiProvider} from 'tamagui';
import Component from './src/Component';

import config from './tamagui.config';
import {StyleSheet} from 'react-native';
import Modals from './src/Modals';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Tabs from './src/Tabs';
import HeaderTabs from './src/HeaderTabs';
import HeaderTabs2 from './src/HeaderTabs2';
import HeaderTabs3 from './src/HeaderTabs3';

export type RootStackParamList = {
  Home: undefined;
  Component: undefined;
  Modals: undefined;
  Tabs: undefined;
  HeaderTabs: undefined;
  HeaderTabs2: undefined;
  HeaderTabs3: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type ComponentProps = NativeStackScreenProps<
  RootStackParamList,
  'Component'
>;

export type ModalsProps = NativeStackScreenProps<RootStackParamList, 'Modals'>;

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Component" component={Component} />
              <Stack.Screen name="Modals" component={Modals} />
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="HeaderTabs" component={HeaderTabs} />
              <Stack.Screen name="HeaderTabs2" component={HeaderTabs2} />
              <Stack.Screen name="HeaderTabs3" component={HeaderTabs3} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

export default App;
