import 'react-native-get-random-values';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from '~/app/app';
import { name as appName } from '~/app.json';

AppRegistry.registerComponent(appName, () => App);
