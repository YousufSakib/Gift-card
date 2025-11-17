import { Link } from 'react-router';
import { cn } from '~/lib/cn';

type Props = {
    heading: string;
    linkItems: { title: string; link: string; icon?: React.ReactNode }[];
};

export default function FooterQuickLinks({ heading, linkItems }: Props) {
    return (
        <div className="flex flex-col items-start gap-3 lg:gap-4">
            <h4 className="text-content-50 font-semibold">{heading}</h4>

            <ul className="space-y-3 lg:space-y-4">
                {linkItems.map(({ title, link, icon }, index) => (
                    <li key={index}>
                        <Link
                            to={link}
                            className={cn('flex items-center gap-3', icon && 'py-3')}
                            target={icon ? '_blank' : undefined}
                        >
                            {icon && icon}
                            <h5 className="hidden lg:block text-content-50 font-normal">{title}</h5>
                            <p className="p-md lg:hidden">{title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
