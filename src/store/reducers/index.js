import { combineReducers } from 'redux';

// reducer import
import userReducer from './userReducer';
import sponsorReducer from './sponsorReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    user: userReducer,
    sponsor: sponsorReducer,
});

export default reducer;
