import React from 'react';
import { cn } from '~/lib/cn';

type Props = { className?: string };

export default function Divider(props: Props) {
    return <div className={cn('w-full h-[1px] bg-surface-50 ', props.className)} />;
}
