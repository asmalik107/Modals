import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Select, Adapt, Sheet} from 'tamagui';
import {Check, ChevronDown} from '@tamagui/lucide-icons';
import {FullWindowOverlay} from 'react-native-screens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const items = [
  {name: 'Apple'},
  {name: 'Pear'},
  {name: 'Blackberry'},
  {name: 'Peach'},
  {name: 'Apricot'},
  {name: 'Melon'},
  {name: 'Honeydew'},
  {name: 'Starfruit'},
  {name: 'Blueberry'},
  {name: 'Raspberry'},
];

function Components() {
  const [val, setVal] = useState('apple');
  const [open, setOpen] = useState(false);
  const native = true;

  const Modal = true ? FullWindowOverlay : React.Fragment;

  return (
    <View style={styles.container}>
      <Text>Component Screen</Text>
      <Select
        onOpenChange={setOpen}
        id="food"
        value={val}
        onValueChange={setVal}
        disablePreventBodyScroll>
        <Select.Trigger width={220} iconAfter={ChevronDown}>
          <Select.Value placeholder="Something" />
        </Select.Trigger>

        <Modal>
          <Adapt when="sm" platform="touch">
            <Sheet
              // native={!!native}
              snapPoints={[60, 100]}
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 1.2,
                stiffness: 60,
              }}>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>

              <Sheet.Overlay
                animation="lazy"
                enterStyle={{opacity: 0}}
                exitStyle={{opacity: 0}}
              />
            </Sheet>
          </Adapt>
        </Modal>

        <Select.Content zIndex={200000}>
          <Select.Viewport
            // to do animations:
            // animation="quick"
            // animateOnly={['transform', 'opacity']}
            // enterStyle={{ o: 0, y: -10 }}
            // exitStyle={{ o: 0, y: 10 }}
            minWidth={200}>
            <Select.Group>
              <Select.Label accessible>Fruits</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item
                        accessible
                        accessibilityLabel={item.name}
                        index={i}
                        key={item.name}
                        value={item.name.toLowerCase()}>
                        <Select.ItemText>{item.name}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  }),
                [items],
              )}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
    </View>
  );
}

export default Components;
