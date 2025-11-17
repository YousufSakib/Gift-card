import { useState, type Dispatch, type SetStateAction } from 'react';
import { envConfig } from '~/config/envConfig';
import { PlusIcon } from '~/constants/icons';

type Props = {
    selectedImage: File | null;
    setSelectedImage: Dispatch<SetStateAction<File | null>>;
    imageData?: string;
};

export default function UploadGiftCardImage(props: Props) {
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && props.setSelectedImage) {
            const imageFile = e.target.files[0];
            props.setSelectedImage(imageFile);

            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewImageUrl(objectUrl);
        }
    };

    return (
        <div className="bg-surface-300 p-5 rounded-lg">
            <label htmlFor="upload-image" className="cursor-pointer">
                <div className="flex flex-col gap-5 text-center ">
                    <h5 className="font-semibold">Upload Image</h5>

                    {previewImageUrl || props.imageData ? (
                        <div className="size-[12.5rem] rounded-lg">
                            <img
                                src={
                                    previewImageUrl ||
                                    `${envConfig.API_BASE_URL}/${props.imageData}`
                                }
                                alt="prview image url"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-surface-50 flex flex-col items-center justify-center gap-2 size-[12.5rem] rounded-lg border border-surface-600 border-dashed">
                            <PlusIcon className="text-primary-500" />
                            <span className="p-md text-content-400">Upload</span>
                        </div>
                    )}
                </div>
            </label>

            <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
        </div>
    );
}
