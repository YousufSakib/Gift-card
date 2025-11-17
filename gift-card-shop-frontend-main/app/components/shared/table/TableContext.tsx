import Divider from '~/components/shared/Divider';
import { cn } from '~/lib/cn';
import React from 'react';

type Props = {
    title: string;
    children?: React.ReactNode;
    classname?: string;
};

export default function TableContext({ title, children, classname }: Props) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="p-lg font-semibold">{title}</p>

                <div className={cn('flex items-center gap-4', classname)}>{children}</div>
            </div>

            <Divider className="bg-surface-600" />
        </div>
    );
}
