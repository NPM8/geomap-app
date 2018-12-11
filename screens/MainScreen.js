import React, {PureComponent} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MyButtonHandler from "../components/MyButtonHandler";
import {connect} from 'react-redux';
import { Location, Permissions } from 'expo';
import Colors from "../constants/Colors";
import {addData, loadAsyncPoints, removeAll, select, unselect} from "../reducer";
import PointComponent from "../components/PointComponent";

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
        this.swapSelected = this.swapSelected.bind(this);
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
        this.props.removeAll()
    }

    goMap = () => {
        this.props.navigation.navigate('map')
    }

    swapSelected(object) {
        console.log(object.selected);

        if (object.selected) {
            delete object.selected;
            this.props.unselect(object);
        }
        else {
            delete object.selected;
            this.props.select(object)
        }
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
                    renderItem={(item) => (<PointComponent key={item.item.key} pointObject={item.item} swapSelect={this.swapSelected}/>)}
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
       const selected = (state.selected.filter(valu2e => valu2e.id == value.id).length >= 1);
       // console.log(state.selected);
       return {...value, selected, key: value.id}
    });
    console.log(state.selected)
    return {
        elems
    }
}

const mapDispatchToProps = {
    loadAsyncPoints,
    select,
    unselect,
    addData,
    removeAll
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
