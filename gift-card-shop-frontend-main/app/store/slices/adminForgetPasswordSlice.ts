import type { StateCreator } from 'zustand';

export const adminForgetPasswordSlice: StateCreator<AdminForgetPassword> = set => ({
    forgotEmail: null,
    setForgotEmail: email => set(() => ({ forgotEmail: email })),
    adminForgetPassword: null,
    setAdminForgetPassword: state => set(() => ({ adminForgetPassword: state })),
});
