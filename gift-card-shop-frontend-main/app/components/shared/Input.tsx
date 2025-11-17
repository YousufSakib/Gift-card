import type { InputHTMLAttributes, ReactNode } from 'react';
import { Controller, type Control, type RegisterOptions } from 'react-hook-form';
import { cn } from '~/lib/cn';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    name: string;
    control: Control<any>;
    label?: string;
    rules?: RegisterOptions;
    icon?: ReactNode;
    inputClassName?: string;
};

export default function Input(props: Props) {
    const { control, label, rules, icon, inputClassName, ...rest } = props;

    const isRequired = props.rules?.required === true || typeof props.rules?.required === 'string';

    return (
        <Controller
            name={props.name}
            control={props.control}
            rules={props.rules}
            render={({ field, fieldState: { error } }) => (
                <div className={cn('flex flex-col gap-2', props.className)}>
                    {props.label && (
                        <label htmlFor={props.name} className="p-md">
                            {props.label} {isRequired && <span>*</span>}
                        </label>
                    )}

                    <div className="relative">
                        {props.icon && (
                            <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none text-surface-700 p-md font-medium max-w-[80px] overflow-clip">
                                {props.icon}
                            </span>
                        )}

                        <input
                            {...rest}
                            {...field}
                            className={cn(
                                'w-full bg-surface-50 border border-surface-600 px-3 py-4 rounded-lg placeholder:text-content-200 p-md outline-none disabled:text-content-200 disabled:cursor-not-allowed',
                                props.icon && 'pl-[70px]',
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
