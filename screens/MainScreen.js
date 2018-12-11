import React, {PureComponent} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MyButtonHandler from "../components/MyButtonHandler";
import {connect} from 'react-redux';
import { Location, Permissions } from 'expo';
import Colors from "../constants/Colors";
import {addData, loadAsyncPoints, select, unselect} from "../reducer";

class MainScreen extends PureComponent {
    static navigationOptions ={
        title: "Zapis pozycji",
        headerStyle: {
            backgroundColor: Colors.mainColor},
        headerTitleStyle: {
            color: '#fff'
        }
    }

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.setPermissions();
        this.props.loadAsyncPoints()
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    getPos = async () => {
        console.log('test');
        let pos = await Location.getCurrentPositionAsync({})
        this.props.addData(pos, this.props.elems ? this.props.elems.length : 1 );
    }

    dellAll = () => {
        console.log('test');
    }

    goMap = () => {
        this.props.navigation.navigate('map')
    }

    render() {
        const {elems} = this.props;
        return (
            <View style={styles.main}>
                <View style={styles.topButtonsHolder}>
                    <MyButtonHandler buttonStyle={styles.button} handleOnPress={this.getPos}> POBIERZ I ZAPISZ POZYCJE</MyButtonHandler>
                    <MyButtonHandler buttonStyle={styles.button} handleOnPress={this.dellAll}> USUŃ WSZYTSKIE DANE</MyButtonHandler>
                </View>
                <View style={styles.bottomButtonsHolder}>
                    <MyButtonHandler buttonStyle={styles.button} handleOnPress={this.goMap}> PRZEJDŹ DO MAPY</MyButtonHandler>
                </View>
                <View style={styles.mainFlat}>
                <FlatList
                    data={elems}
                    ListEmptyComponent={<Text style={{textAlign: 'center'}}> Brak elementów </Text>}
                    renderItem={(item) => (<View key={item.item.key}>
                        <Text>timestemp {item.item.timestamp}</Text>
                        <Text>latitude {item.item.coords.latitude}</Text>
                        <Text>longlitude {item.item.coords.longitude}</Text>
                    </View>)}
                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topButtonsHolder: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between'
    },
    bottomButtonsHolder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    main: {
       flex: 1,
       flexDirection: 'column'
    },
    button: {
        flex: 1,
        height: 50,
        justifyContent: 'center'
    },
    mainFlat: {
        flex: 8,
        flexDirection: 'row'
    }
});

const mapStateToProps = (state)  => {
    const elems = state.points.map((value, index) => {
       const selected =  state.selected.includes(value);
       return {...value, selected, key: value.id}
    });
    return {
        elems
    }
}

const mapDispatchToProps = {
    loadAsyncPoints,
    select,
    unselect,
    addData
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
