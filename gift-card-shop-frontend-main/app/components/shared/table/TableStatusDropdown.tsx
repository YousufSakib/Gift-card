import React from 'react';
import { ChevronDown } from '~/constants/icons';
import { cn } from '~/lib/cn';

type Props = {
    statusOptions: TableStatsuOption[];
    value: string;
    onChange: (value: string) => void;
};

export default function TableStatusDropdown({ statusOptions, value, onChange }: Props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const dropDownRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false); 
            }
        }
        function handleScroll(event: Event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsOpen(false); 
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };
    return (
        <div className="relative w-40 text-[12px]" ref={dropDownRef}>
            <button
               type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between bg-surface-50 px-3 py-2 rounded-md w-full"
            >
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            'w-3 h-3 rounded-full',
                            statusOptions.find(
                                option => option.label.toLowerCase() === value?.toLowerCase()
                            )?.color || 'bg-gray-500'
                        )}
                    />
                    <span className="capitalize">{value}</span>
                </div>
                <ChevronDown />
            </button>

            {isOpen && (
                <ul className="absolute left-0 w-full mt-1 bg-surface-50 border-2 border-surface-50 rounded-md shadow-lg z-10">
                    {statusOptions.map(option => (
                        <li
                            key={option.label}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-surface-500 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSelect(option.label);
                            }}  
                        >
                            <span className={cn('w-3 h-3 rounded-full', option.color)} />
                            <span className="capitalize">{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
