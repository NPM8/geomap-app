import React, {PureComponent as Component} from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import Colors from "../constants/Colors";
import PropTypes from 'prop-types';

class PointComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.pointObject.selected
        }
    }


    componentDidMount() {
        this.setState({
            selected: this.props.pointObject.selected
        });
    }

    swapSelect = () => {
            let obj = {...this.props.pointObject};
            delete obj.key;
            this.props.swapSelect(obj)
    }

    render() {
        if(this.props.pointObject != null) {
            return (
                <View style={styles.main}>
                    <Icon
                        name="map"
                        color={Colors.mainColor}
                        containerStyle={{flex: 1}}
                    />
                    <View style={styles.textHolder}><Text style={styles.boldOne}>Timestamp: {this.props.pointObject.timestamp}</Text><Text>latitude: {this.props.pointObject.coords.latitude}</Text><Text>longitude: {this.props.pointObject.coords.longitude}</Text></View>
                    <Icon
                        name={"check"}
                        color={this.props.pointObject.selected ? Colors.mainColor : Colors.uncheckedColor}
                        onPress={this.swapSelect}
                        containerStyle={{flex: 1}}
                    />
                </View>
            );
        } else {
                        return (<Text>FTW</Text>)
        }
    }
}

        const styles = StyleSheet.create({
            main: {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 50
            },
            textHolder: {
                flex: 2,
                flexDirection: "column"
            },
boldOne: {
                fontWeight: "bold"
}
        })

PointComponent.propTypes = {
    pointObject: PropTypes.object.isRequired,
    swapSelect: PropTypes.func.isRequired,
};


export default PointComponent;
