import {
    REQUEST_DETAILS,
    RECEIVE_DETAILS,
    RECEIVED_ERROR
} from '../constants/reduxConstants'

export default function details(
    state = {
        isFetching: true,
        didInvalidate: false,
        details: {}
    },
    action
) {
    switch (action.type) {
        case REQUEST_DETAILS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_DETAILS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                details: action.details,
                lastUpdated: action.receivedAt
            })
        case RECEIVED_ERROR:
            return Object.assign({}, state, {
                didInvalidate: true,
            })
        default:
            return state
    }
}
