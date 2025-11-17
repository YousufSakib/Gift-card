import type { StateCreator } from 'zustand';

export const giftCardSlice: StateCreator<GiftCardSlice> = (set, get) => ({
    giftCards: [],
    setGiftCards: (giftCards: GiftCard[]) => {
        const currentData = get().giftCards;
        const isDataDifferent = JSON.stringify(currentData) !== JSON.stringify(giftCards);

        if (isDataDifferent) {
            set({ giftCards: giftCards });
        }
    },
});
