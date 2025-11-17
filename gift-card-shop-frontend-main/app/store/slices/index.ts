import type { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { giftCardSlice } from './giftCardSlice';
import { buyGiftCardSlice } from './buyGiftCardSlice';
import { adminForgetPasswordSlice } from './adminForgetPasswordSlice';
import { adminUserSlice } from './adminUserSlice';

export const createSlicesRoot: StateCreator<PersisitedRootState> = (...params) => ({
    ...giftCardSlice(...params),
    ...buyGiftCardSlice(...params),
    ...adminForgetPasswordSlice(...params),
    ...adminUserSlice(...params),
});
