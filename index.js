/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/services/i18n/i18n';

AppRegistry.registerComponent(appName, () => App);
