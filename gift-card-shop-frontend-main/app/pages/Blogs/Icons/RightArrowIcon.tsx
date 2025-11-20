import React from 'react';
import type { IconProps } from './IconProps';

export const RightArrowIcon: React.FC<IconProps> = ({
    size = 18,
    color = '#0c2c67',
    className,
    ...rest
}) => (
    <svg
        viewBox="-19.04 0 75.804 75.804"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...rest}
    >
        <g transform="translate(-831.568 -384.448)">
            <path
                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                fill={color}
            />
        </g>
    </svg>
);
