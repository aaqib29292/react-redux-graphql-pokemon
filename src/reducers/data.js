import {
    REQUEST_DATA,
    RECEIVE_DATA,
    FETCHING_MORE, RECEIVED_ERROR,
} from '../constants/index'

export default function data(
    state = {
        isFetching: true,
        didInvalidate: false,
        isFetchingMore: false,
        data: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                isFetchingMore:false,
                data: action.data,
                lastUpdated: action.receivedAt
            })
        case FETCHING_MORE:
            return Object.assign({}, state, {
                isFetchingMore: true,
            })
        case RECEIVED_ERROR:
            return Object.assign({}, state, {
                didInvalidate: true,
            })
        default:
            return state
    }
}
