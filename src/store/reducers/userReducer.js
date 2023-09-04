import { ADD_USER, DELETE_USER, EDIT_USER, GET_ALL_USERS } from 'store/actionTypes';

const initUserState = {
    users: []
};

const userReducer = (state = initUserState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: [...action.payload.users]
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload.user, ...state.users]
            };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id !== action.payload.user._id ? user : action.payload.user
                )
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default userReducer;