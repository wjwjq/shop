import { ActionCreator } from 'redux';

import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, IncrementEnthusiasm, DecrementEnthusiasm } from './types';

export const incrementEnthusiasm: ActionCreator<IncrementEnthusiasm> = () => ({
    type: INCREMENT_ENTHUSIASM
});

export const decrementEnthusiasm: ActionCreator<DecrementEnthusiasm> = () => ({
    type: DECREMENT_ENTHUSIASM
});
