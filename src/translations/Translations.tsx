import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'tamagui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    //justifyContent: 'center',
    backgroundColor: 'white',
  },
});

function TranslationsScreen() {
  const {t} = useTranslation(['translations', 'common']);

  return (
    <ScrollView style={styles.container}>
      <Text>{t('test', {ns: 'common'})}</Text>
      <Text>{t('test2.test')}</Text>
    </ScrollView>
  );
}

export default TranslationsScreen;
