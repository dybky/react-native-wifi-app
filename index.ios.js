var React = require('react-native');
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} = React;

var Firebase = require('firebase');
class myfirebase extends Component {
  // Your App Code
  constructor(props) {
    super(props);
    };
  componentDidMount() {
  }
 
  render() {
    return (
      <View style={styles.appContainer}>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
});

AppRegistry.registerComponent('myfirebase', () => myfirebase);