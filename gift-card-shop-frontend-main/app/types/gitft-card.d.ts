type GiftCard = {
    _id: string;
    name: string;
    description: string;
    image: string;
    cardValue: number;
    price: number;
    cardCode: string[];
    status: boolean;
    soldCards: string[];
} & TimeStamp;
