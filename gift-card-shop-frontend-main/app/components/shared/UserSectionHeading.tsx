import React from 'react';
import { cn } from '~/lib/cn';

type Props = { title: string; subTitle: string; className?: string };

export default function UserSectionHeading(props: Props) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3 text-center',
                props.className
            )}
        >
            <span className="p-lg text-primary-500 lg:hidden">{props.title}</span>
            <h4 className="text-primary-500 font-medium hidden lg:block">{props.title}</h4>
            <h2 className="font-oswald lg:display-5">{props.subTitle}</h2>
        </div>
    );
}
