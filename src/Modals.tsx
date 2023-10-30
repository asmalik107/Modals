import {ChevronDown} from '@tamagui/lucide-icons';
import React, {FC, PropsWithChildren, useState, useEffect} from 'react';
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
    <RNModal {...rest} animationType="none" transparent={true}>
      {children}
    </RNModal>
  );
};

const Modals = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const snapPoints = [50];

  useEffect(() => {
    if (open) {
      setModalOpen(true);
    } else {
      setTimeout(() => {
        setModalOpen(false);
      }, 200);
    }
  }, [open]);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setOpen(true);
        }}>
        Modals
      </Button>
      <ModalWrapper visible={modalOpen} onRequestClose={() => setOpen(false)}>
        <Sheet
          // forceRemoveScrollEnabled={open}
          modal={false}
          open={open}
          onOpenChange={setOpen}
          snapPoints={snapPoints}
          // snapPointsMode={snapPointsMode}
          dismissOnOverlayPress
          dismissOnSnapToBottom
          zIndex={100_000}
          animationConfig={{
            type: 'spring',
            damping: 40,
            mass: 1.2,
            stiffness: 250,
          }}
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
            <View style={styles.contentContainer}>
              <Button
                size="$6"
                circular
                icon={ChevronDown}
                onPress={() => setOpen(false)}
              />
              <Text>Awesome1 🎉</Text>
            </View>
          </Sheet.Frame>
        </Sheet>
      </ModalWrapper>
    </View>
  );
};

export default Modals;
