import React from 'react';
import { Controller, type Control } from 'react-hook-form';

type CheckboxProps = {
    name: string;
    label?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    control?: Control<any>;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, value, control, label }) => {
    return (
        <div className="block min-h-[1.5rem]">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center gap-3">
                        <>
                            <input
                                type="checkbox"
                                id={name}
                                className="peer hidden"
                                checked={field.value}
                                onChange={e => field.onChange(e.target.checked)}
                                value={value}
                            />
                            {/*  */}
                            <label
                                htmlFor={name}
                                className="flex items-center justify-center size-6 rounded-md border border-primary-500 transition-all peer-checked:bg-primary-500 peer-checked:border-primary-500 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="11"
                                    viewBox="0 0 15 11"
                                    fill="none"
                                    className={`transition-opacity duration-200 ${
                                        field.value ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <path
                                        d="M6.237 10.9745L6.21213 10.9999L0.00012207 4.64989L2.02287 2.5822L6.23709 6.89004L12.9774 0L15.0001 2.06769L6.26196 11L6.237 10.9745Z"
                                        fill="white"
                                    />
                                </svg>
                            </label>
                        </>

                        {label && <span className="p-md font-medium">{label}</span>}
                    </div>
                )}
            />
        </div>
    );
};

export default Checkbox;
