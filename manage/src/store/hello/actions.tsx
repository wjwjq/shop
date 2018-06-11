import { ActionCreator } from 'redux';
import * as constants from './constants';

import {IncrementEnthusiasm, DecrementEnthusiasm} from './types';

export const incrementEnthusiasm: ActionCreator<IncrementEnthusiasm> = () => ({
    type: constants.INCREMENT_ENTHUSIASM
});

export const decrementEnthusiasm: ActionCreator<DecrementEnthusiasm> = () => ({
    type: constants.DECREMENT_ENTHUSIASM
});
