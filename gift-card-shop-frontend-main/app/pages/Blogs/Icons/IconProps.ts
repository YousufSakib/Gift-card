import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string; // width and height in px or string (e.g. "1.5rem")
    color?: string; // stroke or fill color
    strokeWidth?: number | string;
}
