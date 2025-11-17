import { cn } from '~/lib/cn';
import Breadcrumbs from '../Breadcrumbs';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    breadcumbItems: { label: string; href?: string }[];
    pageTitle: string;
};

export default function AdminPageWrapper(props: Props) {
    return (
        <div className={cn('flex flex-col gap-4', props.className)}>
            <Breadcrumbs items={props.breadcumbItems} />
            <h3 className="font-semibold capitalize">{props.pageTitle}</h3>

            <>{props.children}</>
        </div>
    );
}
