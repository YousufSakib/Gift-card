import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSlicesRoot } from './slices';

export const store = create<PersisitedRootState>()(
    persist(createSlicesRoot, { name: 'gift-card-shop-storage' })
);
