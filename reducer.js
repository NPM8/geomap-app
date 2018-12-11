import { AsyncStorage } from "react-native"

export const GET_DATA = 'GET_DATA';
export const GET_DATA_FAIL = 'GET_DATA_FAIL';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const SELECTED = 'SELECTED';
export const UNSELECT = 'UNSELECT';
export const ADD_DATA = 'ADD_DATA';
export const REMOVE_ALL = 'REMOVE_ALL';

const initialState = {
    loadingPoints: true,
    points: [],
    selected: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {...state, loadingPoints: true}
            break;
        case GET_DATA_FAIL:
            return {...state, loadingPoints: true, loadingPointsError: action.payload};
            break;
        case GET_DATA_SUCCESS:
            return {...state, loadingPoints: false, points: action.payload};
            break;
        case SELECTED:
            return {...state, selected: [ ...state.selected, action.payload]};
            break;
        case UNSELECT:
            const arr = state.selected.filter(value => value.id != action.payload.id);
            console.log(arr);
            return {...state, selected: arr};
            break;
        case ADD_DATA:
            return {...state, points: [...state.points, action.payload]};
            break;
        case REMOVE_ALL:
            console.log(action.payload);
            return {...state, ...action.payload};
            break;
        default:
            return  {...state}
    }
}

export function loadPoints() {
    return {
        type: GET_DATA
    }
}


export function loadPointsFail(payload) {
    return {
        type: GET_DATA_FAIL,
        payload
    }
}

export function removeAllBind() {
    return {
        type: REMOVE_ALL,
        payload: {
            selected: [],
            points: []
        }
    }
}

export function loadPointsSuccess(payload) {
    return {
        type: GET_DATA_SUCCESS,
        payload
    }
}

export function selected(payload) {
    return {
        type: SELECTED,
        payload
    }
}

export function unselected(payload) {
    return {
        type: UNSELECT,
        payload
    }
}

export function addPoint(payload) {
    // console.log('paylaod: ', payload);
    return {
        type: ADD_DATA,
        payload
    }
}

export function loadAsyncPoints() {
    return async dispatch => {
      dispatch(loadPoints());
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let point = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = JSON.parse(store[i][1]);
            return {id: key, ...value}
        });
        dispatch(loadPointsSuccess(point));
    };
}

export function removeAll() {
    return async dispatch => {
        let keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        dispatch(removeAllBind());
    }

}

export function addData(object, id) {
    return async dispatch => {
        await AsyncStorage.setItem(id.toString(), JSON.stringify({...object, id}));
        // console.log('test 2 ', {...object, id})
        dispatch(addPoint({...object, id}))
    }
}

export function select(object) {
    return dispatch => {
        dispatch(selected(object))
    }

}

export function unselect(object) {
    return dispatch => {
        dispatch(unselected(object))
    }
}
