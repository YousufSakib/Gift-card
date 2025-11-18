import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import TableStatusDropdown from '~/components/shared/table/TableStatusDropdown';
import Textarea from '~/components/shared/TextArea';
import { PlusIcon } from '~/constants/icons';
import { useMutation } from '~/hooks/useMutation';
import UploadGiftCardImage from './UploadGiftCardImage';
import { useNavigate } from 'react-router';
import Loader from '~/components/shared/Loader';
import SubmitButton from '~/components/shared/SubmitButton';

type Props = { apiData?: GiftCard; isEdit?: boolean };

const options = [
    { label: 'active', color: 'bg-green-500' },
    { label: 'inactive', color: 'bg-red-500' },
];

type FormData = {
    name: string;
    description: string;
    cardCodes: { value: string }[];
    cardValue: number;
    price: number;
    status: string;
};

export default function GitfCardForm({ apiData, isEdit = false }: Props) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const { control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            name: apiData?.name || '',
            description: apiData?.description || '',
            cardCodes: apiData?.cardCode?.map(code => ({ value: code })) || [{ value: '' }],
            cardValue: apiData?.cardValue || 0,
            price: apiData?.price || 0,
            status:
                apiData?.status === true
                    ? 'active'
                    : apiData?.status === false || apiData?.status === 'inactive'
                      ? 'inactive'
                      : 'active',
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'cardCodes',
    });

    const { mutate: createCard, loading: createCardLoading } = useMutation('post');
    const { mutate: updateCard, loading: updateCardLoading } = useMutation('patch');

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('cardValue', String(data.cardValue));
        formData.append('price', String(data.price));
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        formData.append('status', data.status === 'active' ? 'true' : 'false');
        data.cardCodes.forEach(code => formData.append('cardCode[]', code.value));

        const mutationFn = !isEdit
            ? () =>
                  createCard('card', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                  })
            : () =>
                  updateCard(`card/${apiData?._id}`, formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                  });

        try {
            await toast.promise(mutationFn(), {
                loading: isEdit ? 'Updating gift card...' : 'Creating gift card...',
                success: isEdit
                    ? 'Gift card updated successfully'
                    : 'Gift card created successfully',
                error: (err: any) =>
                    err?.response?.data?.message || 'Error creating or updating card',
            });
            navigate('/admin/gift-cards');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <UploadGiftCardImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                imageData={apiData?.image}
            />

            <div className="flex-1 bg-surface-300 rounded-lg p-5 flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <h5 className="font-semibold">Basic Information</h5>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            control={control}
                            name="name"
                            label="Gift Card Name"
                            rules={{ required: 'Gift Card name is required' }}
                            placeholder="Write gift card name"
                            className="col-span-full"
                        />
                        <Textarea
                            control={control}
                            name="description"
                            label="Gift Card Description"
                            rules={{ required: 'Gift Card description is required' }}
                            placeholder="Write a short description"
                            className="col-span-full"
                        />

                        <Input
                            name="cardValue"
                            control={control}
                            label="Card Value"
                            placeholder="Enter value"
                            rules={{
                                required: 'Card value is required',
                                min: { value: 1, message: 'card value cant be 0' },
                            }}
                            icon={<span>$</span>}
                            type="number"
                        />

                        <Input
                            name="price"
                            control={control}
                            label="Price"
                            placeholder="Enter price"
                            rules={{
                                required: 'Price is required',
                                min: { value: 0.4, message: 'price cant be 0' },
                            }}
                            icon={<span>USDT</span>}
                            type="number"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h5 className="font-semibold">Additional Information</h5>

                    <div className="flex flex-col items-start gap-4">
                        <span className="p-md">Gift card code *</span>
                        {fields.map((field, index) => (
                            <div key={field.id} className="w-full flex items-end gap-4">
                                <Input
                                    control={control}
                                    name={`cardCodes.${index}.value`}
                                    placeholder="Write the gift card code"
                                    rules={{ required: 'gift card code is required' }}
                                    className="w-full"
                                />
                                <button
                                    title="Remove"
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="size-[3.4375rem] text-primary-500 bg-surface-50 p-[0.625rem] font-semibold cursor-pointer rounded-lg border border-surface-600"
                                >
                                    -
                                </button>
                            </div>
                        ))}

                        <button
                            className="p-0 bg-transparent flex items-center gap-2 text-primary-500 cursor-pointer"
                            type="button"
                            onClick={() => append({ value: '' })}
                        >
                            <PlusIcon />
                            <span>Add another code</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="p-md">Status</span>
                    <TableStatusDropdown
                        onChange={value => setValue('status', value)}
                        statusOptions={options}
                        value={watch('status')}
                    />
                </div>

                <div className="flex items-center gap-5">
                    <SubmitButton
                        title={isEdit ? 'Save' : 'Add card'}
                        loading={createCardLoading || updateCardLoading}
                        loadingText={isEdit ? 'Saving' : 'Adding'}
                    />

                    <Button
                        title="Cancel"
                        type="button"
                        variant="ghost"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </div>
        </form>
    );
}
