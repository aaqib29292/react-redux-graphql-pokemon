import { combineReducers } from 'redux';
import data from './data';
import limit from './limit';
import details from './details';

const rootReducer = combineReducers({
    data,
    limit,
    details
})

export default rootReducer
