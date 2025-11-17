import { cn } from '~/lib/cn';

type Props = { text?: string; className?: string };

export default function NoDataFound(props: Props) {
    return (
        <div
            className={cn(
                'flex items-center justify-center min-h-1/6 font-bold text-2xl text-content-200 uppercase font-oswald',
                props.className
            )}
        >
            {props.text ? props.text : 'No Data Found'}
        </div>
    );
}
