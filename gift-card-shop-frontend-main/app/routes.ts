import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
    // default user routes
    layout('./layouts/user-layout/index.tsx', [
        index('./pages/home/index.tsx'),
        route('gift-cards', './pages/giftcards/index.tsx'),
        route('blogs', './pages/Blogs/index.tsx'),
    ]),

    // admin routes
    ...prefix('admin', [
        route('/', './pages/admin/sign-in/index.tsx'),

        layout('./layouts/admin-layout/index.tsx', [
            route('dashboard', './pages/admin/dashboard/index.tsx'),

            ...prefix('gift-cards', [
                index('./pages/admin/gift-cards/index.tsx'),
                route('create', './pages/admin/gift-cards/create/index.tsx'),
                route('edit/:id', './pages/admin/gift-cards/edit/index.tsx'),
            ]),

            route('orders', './pages/admin/orders/index.tsx'),

            ...prefix('profile', [
                index('./pages/admin/profile/index.tsx'),
                route('edit', './pages/admin/profile/edit/index.tsx'),
            ]),

            ...prefix('settings', [
                index('./pages/admin/settings/index.tsx'),
                route('edit', './pages/admin/settings/edit/index.tsx'),
            ]),
        ]),
    ]),

    // page not found
    route('*', './pages/notFoundPage/NotFoundPage.tsx'),
] satisfies RouteConfig;
