import { forwardRef, useRef, useImperativeHandle } from 'react';
import * as htmlToImage from 'html-to-image';
import CouponBG from '~/assets/images/coupon-BG.png';
import toast from 'react-hot-toast';

export type GiftCardCouponHandle = { downloadImage: () => void };

type Props = { order: Order };

const GiftCardCoupon = forwardRef<GiftCardCouponHandle, Props>(({ order }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Expose downloadImage to parent
    useImperativeHandle(ref, () => ({
        downloadImage: async () => {
            if (!divRef.current) return;

            try {
                const node = divRef.current;

                const scale = 2;
                const style = window.getComputedStyle(node);
                const width = parseInt(style.width, 10);
                const height = parseInt(style.height, 10);

                const dataUrl = await htmlToImage.toJpeg(node, {
                    width: width * scale,
                    height: height * scale,
                    style: {
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: `${width}px`,
                        height: `${height}px`,
                    },
                    pixelRatio: scale,
                });

                const link = document.createElement('a');
                link.download = 'gift-card.png';
                link.href = dataUrl;
                link.click();

                toast.success('Image downloaded successfully');
            } catch (error) {
                console.error('Image download failed:', error);
            }
        },
    }));

    return (
        <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none">
            <div ref={divRef} className="w-[9.375rem] min-h-[12.5rem] shadow-lg relative">
                <div className="absolute w-full h-full -z-10">
                    <img src={CouponBG} alt="Coupon BG" className="h-full w-full bg-cover" />
                </div>

                <div className="px-3 py-2">
                    <span className="p-lg font-semibold">{order?.card?.name}</span>
                    <h3 className="font-bold text-primary-500 mt-2">$ {order?.card?.cardValue}</h3>

                    <div className="flex flex-col items-center justify-center gap-1 text-white/80 mt-10">
                        <span className="overline-3 text-center">Code</span>
                        <span className="overline-2 font-semibold">{order?.cardCode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default GiftCardCoupon;
