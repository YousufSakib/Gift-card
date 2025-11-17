import { useState } from 'react';
import { Link } from 'react-router';
import DiscountCard1 from '~/assets/images/discount-card-1.png';
import DiscountCard2 from '~/assets/images/discount-card-2.png';
import DiscountCard3 from '~/assets/images/discount-card-3.png';
import HeroDiscountShape from '~/assets/images/discount-shape.svg?react';
import Button from '~/components/shared/Button';
import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import { GiftCardIcon, GiftShapeIcon, HeroShapeIcon } from '~/constants/icons';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';
import { cn } from '~/lib/cn';
import FeaturesSlider from './FeaturesSlider';

export default function Hero() {
    const [activateCardAnimation, setActivateCardAnimation] = useState(false);

    const observerRef = useIntersectionObserver<HTMLDivElement>({
        handleIntersect: entry => setActivateCardAnimation(entry.isIntersecting),
        threshold: 1,
    });

    return (
        <>
            <UserSectionWrapper className="pb-0 lg:pb-0 relative">
                <div className="flex flex-col items-center gap-8 lg:gap-14">
                    <div className="flex flex-col items-center gap-6 lg:gap-9 w-full relative">
                        <div className="flex flex-col gap-3 text-center relative">
                            <p className="display-4 lg:large-2">
                                The Ultimate <br className="sm:hidden" />
                                <span className="text-primary-500">
                                    Gift Card{' '}
                                    <span className="relative">
                                        Store
                                        <HeroShapeIcon className="size-8 lg:size-16 absolute top-[25%] -right-[30%] animate-ping-full-opacity" />
                                    </span>
                                </span>
                            </p>
                            <p className="display-4 lg:large-2">
                                <span className="text-primary-500">Purchase Using</span>{' '}
                                <span className="relative">
                                    Crypto
                                    <GiftCardIcon className="absolute size-4 lg:size-6 rotate-45 top-[25%] -right-[15%] animate-ping-full-opacity" />
                                </span>
                            </p>

                            <GiftShapeIcon className="absolute top-0 sm:top-1/2 lg:top-1/3 xl:top-1/2 -left-[5%] sm:left-0 xl:-left-[5%] size-[44px] lg:size-[92px]" />
                        </div>

                        {/* <p className="p-md text-content-400 text-center max-w-[28rem]">
                            Google Play • Apple • Steam • PlayStation • Xbox • Amazon • Netflix •
                            Spotify & More!
                        </p> */}

                        <AnimatedBrandTags />

                        <ScrollingSteps />

                        <Link to="#gift-cards">
                            <Button title="Choose You Card" size="lg" />
                        </Link>

                        {/* Absolute Elements */}
                        <div className="absolute top-[260px] -translate-y-1/2 right-[150px] w-[278px] h-[278px] opacity-40 bg-[#d95c19] rounded-full lg:blur-[140px] blur-[180px]" />
                        <GiftShapeIcon className="absolute top-1/2 -translate-y-1/2 right-0 size-[28px] lg:size-[54px]" />
                        <GiftShapeIcon className="absolute -rotate-[30deg] top-full right-0 size-[56px] lg:size-[120px]" />
                        <GiftShapeIcon className="absolute top-full left-0 size-[24px] lg:size-[36px]" />
                        <div className="hidden absolute lg:block top-[320px] left-[20px] w-[278px] h-[278px] opacity-40 bg-[#d95c19] rounded-full lg:blur-[140px]" />
                    </div>

                    <div
                        className="relative w-[300px] lg:w-[452px] mt-[100px] lg:mt-[200px]"
                        ref={observerRef}
                    >
                        <HeroDiscountShape className="w-full h-full object-contain" />

                        <div className="absolute bottom-[10%] lg:bottom-[15%] left-0 right-0 h-[180px] lg:h-[280px] -z-10">
                            <div className="relative w-full h-full flex items-center">
                                <img
                                    src={DiscountCard1}
                                    alt="Discount card 1"
                                    className={cn(
                                        'absolute bottom-[40%] lg:bottom-[35%] h-[80%] lg:h-[90%] transition-all duration-500',
                                        activateCardAnimation
                                            ? 'translate-x-[10%] lg:translate-x-[-10%] opacity-100'
                                            : 'translate-x-[50%] opacity-0'
                                    )}
                                />

                                <img
                                    src={DiscountCard3}
                                    alt="Discount card 3"
                                    className={cn(
                                        'absolute bottom-[45%] lg:bottom-[38%] left-1/2 transform -translate-x-1/2 h-[80%] lg:h-[90%] z-10'
                                    )}
                                />
                                <img
                                    src={DiscountCard2}
                                    alt="Discount card 2"
                                    className={cn(
                                        'absolute bottom-[40%] lg:bottom-[35%] h-[80%] lg:h-[90%] transition-all duration-500',
                                        activateCardAnimation
                                            ? 'translate-x-[140%] lg:translate-x-[125%] opacity-100'
                                            : 'translate-x-1/2 opacity-0'
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </UserSectionWrapper>

            <FeaturesSlider />
        </>
    );
}

const steps = [
    {
        id: 1,
        title: 'Choose your card',
        description: 'Select from our wide range of gift cards',
    },
    {
        id: 2,
        title: 'Complete payment',
        description: 'Secure checkout with multiple payment options',
    },
    {
        id: 3,
        title: 'Receive your code instantly',
        description: 'Get your code delivered via email immediately',
    },
    {
        id: 4,
        title: 'Redeem & enjoy!',
        description: 'Use your gift card and start shopping',
    },
];

const ScrollingSteps = () => {
    const animationStyles = `
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-250px * 4 - 25px * 4));
      }
    }
  `;

    return (
        <div
            style={{
                // backgroundColor: '#FFF8F3',
                padding: '40px 20px',
                width: '100%',
            }}
        >
            <style>{animationStyles}</style>

            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Scrolling Container */}
                <div
                    style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '25px',
                            animation: 'scroll 15s linear infinite',
                            width: 'fit-content',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.animationPlayState = 'paused';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.animationPlayState = 'running';
                        }}
                    >
                        {/* First set of cards */}
                        {steps.map(step => (
                            <div
                                key={step.id}
                                style={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F3 100%)',
                                    border: '2px solid #FFE5D9',
                                    borderRadius: '16px',
                                    padding: '25px 20px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minWidth: '250px',
                                    flexShrink: 0,
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        color: '#2d2d2d',
                                        marginBottom: '10px',
                                        letterSpacing: '-0.3px',
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        ))}

                        {/* Duplicate set for seamless loop */}
                        {steps.map(step => (
                            <div
                                key={`duplicate-${step.id}`}
                                style={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F3 100%)',
                                    border: '2px solid #FFE5D9',
                                    borderRadius: '16px',
                                    padding: '25px 20px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minWidth: '250px',
                                    flexShrink: 0,
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        color: '#2d2d2d',
                                        marginBottom: '10px',
                                        letterSpacing: '-0.3px',
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        ))}

                        {/* Third set for extra smoothness */}
                        {steps.map(step => (
                            <div
                                key={`duplicate2-${step.id}`}
                                style={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F3 100%)',
                                    border: '2px solid #FFE5D9',
                                    borderRadius: '16px',
                                    padding: '25px 20px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minWidth: '250px',
                                    flexShrink: 0,
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        color: '#2d2d2d',
                                        marginBottom: '10px',
                                        letterSpacing: '-0.3px',
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        lineHeight: '1.5',
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

import React from 'react';

const brands = [
    'Google Play',
    'Apple',
    'Steam',
    'PlayStation',
    'Xbox',
    'Amazon',
    'Netflix',
    'Spotify',
    'More!',
];

const AnimatedBrandTags = () => {
    const animationStyles = `
    @keyframes borderGlow {
      0%, 100% {
        border-color: #c86028;
        box-shadow: 0 0 15px rgba(200, 96, 40, 0.5);
      }
      50% {
        border-color: #ff8c52;
        box-shadow: 0 0 25px rgba(255, 140, 82, 0.8);
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }
  `;

    return (
        <div
            style={{
                padding: '20px 10px',
                width: '100%',
            }}
        >
            <style>{animationStyles}</style>

            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {brands.map((brand, index) => (
                    <div
                        key={brand}
                        style={{
                            position: 'relative',
                            padding: '10px 20px',
                            borderRadius: '25px',
                            border: '2px solid #c86028',
                            background:
                                'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(200,96,40,0.1) 50%, rgba(255,255,255,0.1) 100%)',
                            backgroundSize: '200% 100%',
                            animation: `borderGlow 2s ease-in-out infinite, shimmer 3s linear infinite`,
                            animationDelay: `${index * 0.2}s, ${index * 0.3}s`,
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#2d2d2d',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        {brand}
                    </div>
                ))}
            </div>
        </div>
    );
};
