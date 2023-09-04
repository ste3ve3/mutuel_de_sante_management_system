import * as actions from '../actionTypes';

export const getAllUsers = ({ users = [] }) => {
    return {
        type: actions.GET_ALL_USERS,
        payload: {
            users
        }
    };
};

export const addUser = (user) => ({
    type: actions.ADD_USER,
    payload: {
        user
    }
});

export const editUser = (user) => ({
    type: actions.EDIT_USER,
    payload: {
        user
    }
});

export const deleteUser = (id) => ({
    type: actions.DELETE_USER,
    payload: {
        id
    }
});