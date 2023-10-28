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

const Stack = createStackNavigator();

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
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}

export default App;
