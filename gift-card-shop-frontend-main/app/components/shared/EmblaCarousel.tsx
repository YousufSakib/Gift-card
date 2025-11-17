import React from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { cn } from 'app/lib/cn';

type Props = {
    options: EmblaOptionsType;
    direction?: 'row' | 'col';
    className?: string;
    autoScrollSpeed?: number;
    children: React.ReactNode;
};

export default function EmbalaCarousel({
    options,
    direction = 'row',
    autoScrollSpeed = 2,
    children,
    className,
}: Props) {
    const [emblaRef] = useEmblaCarousel(
        {
            ...options,
            watchDrag: true,
        },
        [
            AutoScroll({
                stopOnMouseEnter: true,
                stopOnFocusIn: true,
                stopOnInteraction: false,
                startDelay: 0,
                speed: autoScrollSpeed,
            }),
        ]
    );

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className={cn('flex', className, direction === 'col' ? 'flex-col' : 'flex row')}>
                {children}
            </div>
        </div>
    );
}
