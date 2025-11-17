import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import { GiftShapeIcon } from '~/constants/icons';

export default function Hero() {
    return (
        <section className="bg-primary-50">
            <UserSectionWrapper className="items-center relative">
                <h2 className="font-oswald text-primary-500">Gift cards</h2>

                <h4 className="hidden lg:block font-medium">Explore all gift cards</h4>
                <h5 className="lg:hidden font-medium">Explore all gift cards</h5>

                <GiftShapeIcon className="absolute top-5 left-0 size-8 lg:size-[4.5rem]" />
                <GiftShapeIcon className="absolute top-1/2 right-0 size-5 lg:size-8" />
            </UserSectionWrapper>
        </section>
    );
}
