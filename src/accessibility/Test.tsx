import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  text: {
    marginVertical: 10,
  },
  card: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
  },
});

function TestScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <View
          style={{
            height: 400,
            width: 300,
            backgroundColor: 'red',
          }}
          accessible
          //accessibilityLabel="Testing that this works"
          //accessibilityHint="Actions Available"
          accessibilityActions={[
            {name: 'cut', label: 'cut'},
            {name: 'copy', label: 'copy'},
            {name: 'paste', label: 'paste'},
          ]}
          onAccessibilityAction={event => {
            switch (event.nativeEvent.actionName) {
              case 'cut':
                Alert.alert('Alert', 'cut action success');
                break;
              case 'copy':
                Alert.alert('Alert', 'copy action success');
                break;
              case 'paste':
                Alert.alert('Alert', 'paste action success');
                break;
            }
          }}>
          <Text>Testing accessibility</Text>
        </View>
        <View accessible style={styles.card}>
          <Text style={styles.text}>*</Text>
          <Text style={styles.text}>text one</Text>
          <Text style={styles.text}>text two</Text>
          <Text style={styles.text}> here</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default TestScreen;
