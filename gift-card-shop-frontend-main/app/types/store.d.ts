type PersisitedRootState = StateCreator<RootState, [], [['zustand/persist', RootState]]>;

type RootState = GiftCardSlice & BuyGiftCardSlice & AdminForgetPassword & AdminUserSlice;

type GiftCardSlice = {
    giftCards: GiftCard[] | null;
    setGiftCards: (giftCards: GiftCard[]) => void;
};

type BuyGiftCardSlice = {
    buyerEmail: string | null;
    buyingState: 'otp' | 'verified' | null;
    setBuyingState: (state: 'otp' | 'verified' | null) => void;
    setBuyerEmail: (email: string | null) => void;
};

type AdminForgetPassword = {
    forgotEmail: string | null;
    setForgotEmail: (email: string) => void;
    adminForgetPassword: 'forget-password' | 'otp' | 'change-password' | null;
    setAdminForgetPassword: (state: 'forget-password' | 'otp' | 'change-password' | null) => void;
};

type AdminUserSlice = {
    user: User | null;
    setUser: (user: User) => void;
};
