import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react';
import { cn } from '~/lib/cn';

type Props = HTMLAttributes<HTMLDivElement> & { text?: string };

const Loader = forwardRef<HTMLDivElement, Props>(({ className, text, ...rest }, ref) => {
    const [dots, setDots] = useState('');

    // Animate dots for the text
    useEffect(() => {
        if (!text) return;
        const interval = setInterval(() => {
            setDots(prev => (prev.length === 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div
            ref={ref}
            className={cn('flex items-center justify-center gap-4', className)}
            {...rest}
        >
            <div className="relative size-8">
                {/* Outer Circle (Clockwise) */}
                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent border-r-transparent rounded-full animate-spin" />

                {/* Inner Circle (Counter-clockwise) */}
                <div className="absolute inset-2 border-4 border-primary-900 border-b-transparent border-l-transparent rounded-full animate-spin-reverse" />
            </div>

            {text && (
                <span className="w-24 p-sm font-medium">
                    {text}
                    {dots}
                </span>
            )}
        </div>
    );
});

Loader.displayName = 'Loader';

export default Loader;
