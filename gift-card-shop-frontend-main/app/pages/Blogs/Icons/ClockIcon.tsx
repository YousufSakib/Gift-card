import React from 'react';
import type { IconProps } from './IconProps';

export const ClockIcon: React.FC<IconProps> = ({
    size = 18,
    color = '#FFF',
    strokeWidth = 2,
    className,
    ...rest
}) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...rest}
    >
        <path
            d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
