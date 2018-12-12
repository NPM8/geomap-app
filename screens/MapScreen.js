import React, {PureComponent as Component} from 'react';
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
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: 50.111,
            longitude: 20.111,
        }
    }


    componentDidMount() {
        const {addListener} = this.props.navigation;

        addListener('willFocus', payload => {
            if (this.props.selected.length >=1) {
                this.setState({
                    latitude: this.props.selected[0].coords.latitude,
                    longitude: this.props.selected[0].coords.longitude
                });
            }
        })
    }


    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {this.props.selected.map(value => <MapView.Marker key={value.id} coordinate={{latitude: value.coords.latitude, longitude: value.coords.longitude}} title={`pos ${value.id}`} description={`opis ${value.id}`}/>)}
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
