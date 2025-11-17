import type { StateCreator } from 'zustand';

export const adminUserSlice: StateCreator<AdminUserSlice> = set => ({
    user: null,
    setUser: (user: User) => set({ user: user }),
});
