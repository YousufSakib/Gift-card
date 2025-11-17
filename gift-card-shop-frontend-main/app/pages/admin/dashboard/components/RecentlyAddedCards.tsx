import { envConfig } from '~/config/envConfig';
import { useFetch } from '~/hooks/useFetch';
import { dateFormat } from '~/lib/dateFormat';

type Props = {};

export default function RecentlyAddedCards({}: Props) {
    const { data } = useFetch<APIResponse<GiftCard>>('/cards', { params: { limit: 8 } });

    const cards = data?.docs;

    return (
        <div className="col-span-2 bg-surface-300 p-6 rounded-xl flex flex-col gap-5">
            <span className="p-lg font-semibold">Recently added</span>

            <ul className="space-y-2">
                {cards?.map(card => (
                    <li key={card?._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-[1.9375rem]">
                                <img
                                    src={`${envConfig.API_BASE_URL}/${card?.image}`}
                                    alt={`${card.name}`}
                                    title={card?.name}
                                />
                            </div>
                            <span>{card?.name}</span>
                        </div>

                        <span>{dateFormat(card?.createdAt)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
