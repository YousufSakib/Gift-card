import React from 'react';
import { Link } from 'react-router';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="w-full">
            <ol className="list-reset flex flex-wrap">
                {items.map((item, index) => (
                    <li key={index} className="flex gap-3 items-center capitalize">
                        {item.href ? (
                            <Link to={item.href} className="p-md font-medium">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="p-md text-content-400">{item.label}</span>
                        )}

                        {index < items.length - 1 && (
                            <svg
                                className="mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="9"
                                viewBox="0 0 8 9"
                                fill="none"
                            >
                                <circle cx="4" cy="4.5" r="4" fill="#d95c19" />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
