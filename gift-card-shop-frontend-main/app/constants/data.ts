import { HiddenChargesIcon, InstantDeliveryIcon, OneClickIcon, SecurePaymaentIcon } from './icons';

export const faqList = [
    {
        title: 'How do I pay for a gift card?',
        description:
            'We accept crypto payments via TRON (USDT TRC20) and Binance (USDT BEP20). Just choose your gift card, select your preferred crypto method, and complete the payment.',
    },
    {
        title: 'When will I receive my gift card?',
        description:
            'Instantly! As soon as your payment is confirmed, your gift card will be delivered directly to your email — no waiting.',
    },
    {
        title: 'Can I get support if I face any issue?',
        description:
            'Yes! Our smart chatbot is available 24/7 to help you. Just click the chat icon and get instant assistance.',
    },
    {
        title: 'Do I need to create an account to buy a gift card?',
        description:
            'Nope. We keep it simple — no registration required. Just select, pay, and receive.',
    },
    {
        title: 'Are there any hidden fees?',
        description:
            'Not at all. The price you see is the price you pay. We believe in complete transparency.',
    },
];

export const navItems = [
    { label: 'Home', link: '/' },
    { label: 'Gift Cards', link: '/gift-cards' },
    { label: 'FAQs', link: '#faqs' },
];

export const featureSliderData = [
    { title: 'Safe & Secure Payments', icon: SecurePaymaentIcon },
    { title: 'One-Click Purchase', icon: OneClickIcon },
    { title: 'Instant Delivery', icon: InstantDeliveryIcon },
    { title: 'No Hidden Fees', icon: HiddenChargesIcon },
    { title: 'Safe & Secure Payments', icon: SecurePaymaentIcon },
    { title: 'One-Click Purchase', icon: OneClickIcon },
    { title: 'Instant Delivery', icon: InstantDeliveryIcon },
    { title: 'No Hidden Fees', icon: HiddenChargesIcon },
];

export const adminNavItems = [
    { label: 'Dashboard', link: '/admin/dashboard' },
    { label: 'Orders & Income', link: '/admin/orders' },
    { label: 'Gift Cards', link: '/admin/gift-cards' },
];
