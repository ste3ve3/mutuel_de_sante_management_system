import { ADD_SPONSOR, DELETE_SPONSOR, EDIT_SPONSORS, GET_ALL_SPONSORS } from 'store/actionTypes';

const initSponsorState = {
    sponsors: []
};

const sponsorReducer = (state = initSponsorState, action) => {
    switch (action.type) {
        case GET_ALL_SPONSORS:
            return {
                ...state,
                sponsors: [...action.payload.sponsors]
            };
        case ADD_SPONSOR:
            return {
                ...state,
                sponsors: [action.payload.sponsor, ...state.sponsors]
            };
        case EDIT_SPONSORS:
            return {
                ...state,
                sponsors: state.sponsors.map((sponsor) =>
                    sponsor._id !== action.payload.sponsor._id ? sponsor : action.payload.sponsor
                )
            };
        case DELETE_SPONSOR:
            return {
                ...state,
                sponsors: state.sponsors.filter((sponsor) => sponsor._id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default sponsorReducer;