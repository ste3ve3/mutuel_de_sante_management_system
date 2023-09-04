import * as actions from '../actionTypes';

export const getAllSponsors = ({ sponsors = [] }) => {
    return {
        type: actions.GET_ALL_SPONSORS,
        payload: {
            sponsors
        }
    };
};

export const addSponsor = (sponsor) => ({
    type: actions.ADD_SPONSOR,
    payload: {
        sponsor
    }
});

export const editSponsor = (sponsor) => ({
    type: actions.EDIT_SPONSORS,
    payload: {
        sponsor
    }
});

export const deleteSponsor = (id) => ({
    type: actions.DELETE_SPONSOR,
    payload: {
        id
    }
});