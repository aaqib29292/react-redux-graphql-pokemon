import { INCREASE_LIMIT } from '../constants/reduxConstants'


export default function limit (state = 20, action) {
    switch (action.type) {
        case INCREASE_LIMIT:
            return state + 20
        default:
            return state
    }
}
