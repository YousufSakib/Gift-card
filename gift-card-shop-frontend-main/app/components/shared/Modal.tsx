import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '~/constants/icons';
import { cn } from '~/lib/cn';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    position?: string;
}

const Modal: React.FC<ModalProps> = ({
    show,
    onClose,
    children,
    width = 'w-full',
    height = 'h-full',
    position = 'items-center justify-center',
}) => {
    const modalRef = React.useRef<HTMLDivElement | null>(null);

    // Click Outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose(); // Close modal if clicked outside
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        const body = document.body;
        if (show) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        return () => {
            body.style.overflow = '';
        };
    }, [show]);

    const modalContent = show ? (
        <div
            className={cn(
                'fixed w-screen h-screen inset-0 z-[999] bg-[#0000008c] flex transition-opacity duration-500',
                position,
                show ? 'opacity-100' : 'opacity-0'
            )}
        >
            <div
                ref={modalRef}
                className={cn(
                    'relative overflow-y-auto max-h-[95vh] bg-surface-50 rounded-lg shadow-lg transform transition-transform duration-500',
                    width,
                    height,
                    show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                )}
            >
                <div className="absolute top-[20px] right-[20px] z-50">
                    <CloseIcon className="text-primary-500 cursor-pointer" onClick={onClose} />
                </div>
                <div className="overflow-y-auto overflow-x-hidden w-full h-full p-4 lg:p-5 scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    ) : null;

    return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
