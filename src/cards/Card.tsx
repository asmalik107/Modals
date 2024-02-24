import {PersonStanding, Plus} from '@tamagui/lucide-icons';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    // marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    // borderWidth: 1,
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
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  name: {
    marginVertical: 10,
  },
});

function CardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text>Card Screen</Text>
        <View accessible style={styles.card}>
          <View style={styles.row}>
            <PersonStanding />
            <Text style={styles.text}>TOMAN</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.text}>President</Text>
            <Text style={styles.text}>Mikey</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.text}>Vice President</Text>
            <Text style={styles.text}>Draken</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.text}>Captain</Text>
            <Text style={styles.text}>Takamitchy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default CardScreen;
