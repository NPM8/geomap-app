import React, {Component} from 'react';
import {connect} from 'react-redux';
import Colors from "../constants/Colors";
import { MapView } from 'expo';

class MapScreen extends Component {
    static navigationOptions ={
        title: "Mapa",
        headerStyle: {
            backgroundColor: Colors.mainColor},
        headerTitleStyle: {
            color: '#fff'
        }
    }
    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 50.111,
                    longitude: 20.111,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                {this.props.points.map(value => <MapView.Marker key={value.id} coordinate={{latitude: value.coords.latitude, longitude: value.coords.longitude}} title={`pos ${value.id}`} description={`opis ${value.id}`}/>)}
            </MapView>
        );
    }
}

function mapStateToProps(state) {
    return {selected: state.selected, points: state.points};
}

export default connect(
    mapStateToProps,
)(MapScreen);
