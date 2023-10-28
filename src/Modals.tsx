import {ChevronDown} from '@tamagui/lucide-icons';
import React, {FC, PropsWithChildren, useState} from 'react';
import {
  ModalProps,
  Modal as RNModal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Sheet} from 'tamagui';

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

const ModalWrapper: FC<PropsWithChildren<ModalProps>> = ({
  children,
  ...rest
}) => {
  return (
    <RNModal {...rest} animationType="slide" transparent={true}>
      {children}
    </RNModal>
  );
};

const Modals = () => {
  const [open, setOpen] = useState(false);
  const snapPoints = [85, 50, 25];

  return (
    <View style={styles.container}>
      <Button onPress={() => setOpen(true)}>Modals</Button>
      <ModalWrapper visible={open} onRequestClose={() => setOpen(false)}>
        <Sheet
          forceRemoveScrollEnabled={open}
          modal
          open={open}
          onOpenChange={setOpen}
          snapPoints={snapPoints}
          // snapPointsMode={snapPointsMode}
          dismissOnSnapToBottom
          zIndex={100_000}
          animation="medium">
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{opacity: 0}}
            exitStyle={{opacity: 0}}
          />
          <Sheet.Handle />
          <Sheet.Frame
            padding="$4"
            justifyContent="center"
            alignItems="center"
            space="$5">
            <Button
              size="$6"
              circular
              icon={ChevronDown}
              onPress={() => setOpen(false)}
            />
            <View style={styles.contentContainer}>
              <Text>Awesome1 🎉</Text>
            </View>
          </Sheet.Frame>
        </Sheet>
      </ModalWrapper>
    </View>
  );
};

export default Modals;
