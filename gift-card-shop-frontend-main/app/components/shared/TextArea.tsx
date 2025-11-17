import type { TextareaHTMLAttributes, ReactNode } from 'react';
import { Controller, type Control, type RegisterOptions } from 'react-hook-form';
import { cn } from '~/lib/cn';

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
    name: string;
    control: Control<any>;
    label?: string;
    rules?: RegisterOptions;
    icon?: ReactNode;
    inputClassName?: string;
};

export default function Textarea(props: Props) {
    const { control, label, rules, icon, inputClassName, ...rest } = props;

    const isRequired = rules?.required === true || typeof rules?.required === 'string';

    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            render={({ field, fieldState: { error } }) => (
                <div className={cn('flex flex-col gap-2', props.className)}>
                    {label && (
                        <label htmlFor={props.name} className="p-md">
                            {label} {isRequired && <span>*</span>}
                        </label>
                    )}

                    <div className="relative">
                        {icon && (
                            <span className="absolute top-4 left-3 pointer-events-none text-surface-700 p-md font-medium max-w-[80px] overflow-clip">
                                {icon}
                            </span>
                        )}

                        <textarea
                            {...rest}
                            {...field}
                            className={cn(
                                'w-full min-h-[100px] bg-surface-50 border border-surface-600 px-3 py-4 rounded-lg placeholder:text-content-200 p-md outline-none disabled:text-content-200 disabled:cursor-not-allowed',
                                icon && 'pl-[70px]',
                                rest.readOnly && 'bg-gray-100 cursor-default',
                                rest.className,
                                inputClassName
                            )}
                        />
                    </div>

                    {error && <span className="text-red-500 p-sm">{error.message}</span>}
                </div>
            )}
        />
    );
}
