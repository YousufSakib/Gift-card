import { Link } from 'react-router';
import FooterQuickLinks from './FooterQuickLinks';
import {
    DiscordIcon,
    FacebookIcon,
    LocationIcon,
    MailIcon,
    PhoneIcon,
    TelegramIcon,
    TwitterIcon,
} from '~/constants/icons';
import Divider from '~/components/shared/Divider';
import Logo from '~/assets/images/Kimscard-white-Logo.png';

// Get the current year for the copyright notice
const currentYear = new Date(Date.now()).getFullYear();

const quickLinks = [
    { title: 'Home', link: '/' },
    { title: 'Gift cards', link: '/gift-cards' },
    { title: 'FAQs', link: '#faqs' },
];

const serviceLinks = [
    { title: 'Privacy Policy', link: '#' },
    { title: 'Terms & Conditions', link: '#' },
];

const socialLinks = [
    {
        title: 'Facebook',
        icon: <FacebookIcon />,
        link: 'https://www.facebook.com/',
    },
    {
        title: 'Twitter',
        icon: <TwitterIcon />,
        link: 'https://www.x.com/',
    },
    {
        title: 'Discord',
        icon: <DiscordIcon />,
        link: 'https://www.discord.com/',
    },
    {
        title: 'Telegram',
        icon: <TelegramIcon />,
        link: 'https://www.linkedin.com/',
    },
];

export default function Footer() {
    return (
        <footer className="bg-primary-500 text-content-50">
            <div className="container">
                <div className="py-[40px] lg:py-[60px] flex flex-col gap-3 lg:gap-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                        <div className="max-w-[420px] flex flex-col gap-8">
                            <div className="flex flex-col gap-5">
                                <Link to="/">
                                    <img src={Logo} className="object-contain" />
                                </Link>

                                <p className="p-sm lg:p-lg">
                                    we help businesses and marketers generate high-quality,
                                    SEO-optimized content in minutes. Trusted by thousands
                                    worldwide.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 text-content-50">
                                <div className="flex items-center gap-3">
                                    <MailIcon />

                                    <span className="p-md">admin@giftcard.io</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneIcon />
                                    <span className="p-md">+8801782-448840</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <LocationIcon />
                                    <span className="p-md">
                                        Road 20, Block-C, Mirpur 12, Pallabi, Dhaka-1216, Bangladesh
                                    </span>
                                </div>
                            </div>
                        </div>

                        <FooterQuickLinks heading="Quick Links" linkItems={quickLinks} />
                        <FooterQuickLinks heading="Service" linkItems={serviceLinks} />
                        <FooterQuickLinks heading="Follow us on" linkItems={socialLinks} />
                    </div>

                    <Divider />

                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
                        <span className="overline-1 lg:p-md">
                            Copyright © {currentYear} GIFTCARD
                        </span>
                        <span className="hidden lg:block border border-surface-50 h-5" />
                        <span className="overline-1 lg:p-md">
                            Designed & Developed by YOUSUF ALI SHAKIB
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
