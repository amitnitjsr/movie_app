import { setItemAction, resetItemAction } from '../../shared/commonUpdateState';
const initialState = {
    movie: null,
    movieList: [],
    action: {
        type: null,
        isSuccess: false,
        data: null
    },
    isLoading: false
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_MOVIES_ACTION': return setItemAction(state, payload, 'MOVIES');
        case 'RESET_MOVIES_ACTION': return resetItemAction(state, 'MOVIES');
        default: return state
    }
}