import type { StateCreator } from 'zustand';

export const buyGiftCardSlice: StateCreator<BuyGiftCardSlice> = set => ({
    buyerEmail: null,
    buyingState: null,
    setBuyerEmail: (email: string | null) => set({ buyerEmail: email }),
    setBuyingState: (state: 'otp' | 'verified' | null) => set({ buyingState: state }),
});
