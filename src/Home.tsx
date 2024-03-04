import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {useNavigation} from '@react-navigation/native';
// import { FullWindowOverlay } from "react-native-screens";
// import { gestureHandlerRootHOC } from "react-native-gesture-handler";
// import {enableScreens} from 'react-native-screens';

// enableScreens(false);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

function HomeScreen() {
  const {navigate} = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        //disappearsOnIndex={1}
        //appearsOnIndex={2}
      />
    ),
    [],
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => navigate('Accessibility')}
          title="Accessibility"
          color="black"
        />
        <Button onPress={() => navigate('Cards')} title="Card" color="black" />
        <Button
          onPress={() => navigate('Translations')}
          title="Translations"
          color="black"
        />
        <Button
          onPress={() => navigate('Component')}
          title="Component"
          color="black"
        />
        <Button
          onPress={() => navigate('Modals')}
          title="Modals"
          color="black"
        />
        <Button
          onPress={() => navigate('CollapsibleTabs')}
          title="Collapsible Tabs Component"
          color="black"
        />
        <Button
          onPress={() => navigate('Tabs')}
          title="RN Collapsible Tabs View"
          color="black"
        />
        <Button
          onPress={() => navigate('HeaderTabs')}
          title="Collapsible Tabs"
          color="black"
        />
        <Button
          onPress={() => navigate('HeaderTabs2')}
          title="Collapsible Tabs Tamagui"
          color="black"
        />
        <Button
          onPress={() => navigate('HeaderTabs3')}
          title="Collapsible Tabs - custom"
          color="black"
        />
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          //containerComponent={({children}) => <FullWindowOverlay>{children}</FullWindowOverlay>}
          //containerComponent={({children}) => <Modal>{children}</Modal>}
        >
          <View
            style={styles.contentContainer}
            onAccessibilityEscape={bottomSheetModalRef.current?.dismiss}>
            <Text>Awesome1 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
