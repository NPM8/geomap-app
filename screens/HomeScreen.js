import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { mainColor } from '../constants/Colors';
import MyButton from '../components/MyButtonHandler';
import Colors from "../constants/Colors";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    constructor(props) {
        super(props);
        this.handelStartPress = this.handelStartPress.bind(this);
    }

    handelStartPress() {
      const { navigate } = this.props.navigation;

      navigate("main")
    }

    render() {
    return (
      <View style={styles.container}>
          <View style={styles.titleMain} >
              <Text style={styles.titleText} >Geo Map App</Text>
              <Text style={styles.subTitle}> find and save your position</Text>
          </View>
          <View style={styles.secButtonView}>
              <View style={styles.buttonView}>
                  <MyButton handleOnPress={this.handelStartPress} buttonStyle={styles.button}> START </MyButton>
              </View>
          </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainColor,
        flexDirection: 'column',
    },
    titleMain: {
        flex: 1,
        backgroundColor: mainColor,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    titleText: {
        width: 200,
        fontSize: 24,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center'
    },
    subTitle: {
      width: 200,
        fontSize: 14,
        color: "#fff",
        alignSelf: 'center',
        textAlign: 'center'
    },
    buttonView: {
      // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    secButtonView: {
      flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        // flex: 1
        height: 50,
        justifyContent: 'center'
    }
});
