import { useState, type HTMLAttributes } from 'react';
import { Controller, type Control, type RegisterOptions } from 'react-hook-form';
import { ChevronDown } from '~/constants/icons';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { cn } from '~/lib/cn';
import Divider from './Divider';

type SelectProps = HTMLAttributes<HTMLDivElement> & {
    name: string;
    control: Control<any>;
    label?: string;
    options: { value: string; label: string; icon?: React.ReactNode }[];
    rules?: RegisterOptions;
    placeholder?: string;
    className?: string;
};

export default function Select({
    name,
    control,
    label,
    options,
    rules,
    placeholder,
    className,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => {
                const selectedOption = options.find(opt => opt.value === field.value)?.label;

                return (
                    <div className={cn('flex flex-col gap-2', className)}>
                        {label && (
                            <label htmlFor={name} className="p-md">
                                {label} {rules?.required && <span>*</span>}
                            </label>
                        )}

                        <div className="relative" ref={dropdownRef}>
                            {/* Dropdown Trigger */}
                            <div
                                className={cn(
                                    'w-full border  border-primary-100 bg-surface-500 px-3 py-4 flex items-center justify-between cursor-pointer',
                                    isOpen ? 'rounded-t-lg border-b-0' : 'rounded-lg'
                                )}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="p-md">{selectedOption || placeholder}</span>
                                <ChevronDown className="text-primary-500" />
                            </div>

                            {/* Dropdown Options */}
                            {isOpen && (
                                <div className="absolute w-full border border-primary-100 bg-surface-50 rounded-b-lg z-10">
                                    {options.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-2 px-3 py-2 hover:bg-primary-100 cursor-pointer p-md"
                                            onClick={() => {
                                                field.onChange(option.value);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                {option.icon && <span>{option.icon}</span>}
                                                <span>{option.label}</span>
                                            </div>

                                            {options.length - 1 !== index && (
                                                <Divider className="bg-primary-100" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                    </div>
                );
            }}
        />
    );
}
