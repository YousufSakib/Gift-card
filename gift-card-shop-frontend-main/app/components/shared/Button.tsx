import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '~/lib/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    variant?: 'default' | 'ghost' | 'danger';
    size?: 'default' | 'lg' | 'sm';
    rounded?: boolean;
    icon?: ReactNode;
    iconPosition?: 'after' | 'before';
};

export default function Button(props: Props) {
    const {
        className,
        title,
        variant = 'default',
        size = 'default',
        rounded = true,
        icon,
        iconPosition = 'after',
        ...rest
    } = props;

    const buttonClass = cn(
        'select-none inline-flex items-center justify-center gap-[0.625rem] whitespace-nowrap font-poppins text-content-50 transition-colors duration-500 focus-visible:ghost-none focus-visible:ring-1 disabled:cursor-not-allowed overflow-hidden cursor-pointer',
        {
            'p-sm py-2 px-4': size === 'sm',
            'p-md py-3 px-4': size === 'default',
            'p-lg py-4 px-8': size === 'lg',
            'rounded-full': rounded,
            'rounded-md': !rounded,
            'bg-primary-500 hover:bg-primary-900 focus:bg-primary-900 disabled:bg-surface-900':
                variant === 'default',
            'bg-transparent hover:bg-primary-500 focus:bg-primary-500 text-primary-500 hover:text-content-50 border border-primary-500 disabled:border-surface-900 disabled:text-surface-900':
                variant === 'ghost',
            'bg-red-500 disabled:bg-red-900 disabled:text-surface-900': variant === 'danger',
        },
        className
    );

    return (
        <button className={buttonClass} {...rest}>
            {icon && iconPosition === 'before' && icon}

            {title}

            {icon && iconPosition === 'after' && icon}
        </button>
    );
}
