import React from 'react';
import UserSectionHeading from '~/components/shared/UserSectionHeading';
import UserSectionWrapper from '~/components/shared/UserSectionWrapper';
import { faqList } from '~/constants/data';
import { PlusIcon } from '~/constants/icons';
import { cn } from '~/lib/cn';

export default function Faq() {
    const [activeFaqIndex, setActiveFaqIndex] = React.useState<number | null>(0);

    const toogleActiveFaq = (index: number) =>
        setActiveFaqIndex(index === activeFaqIndex ? null : index);

    return (
        <UserSectionWrapper id="faqs">
            <UserSectionHeading title="FAQS" subTitle="Got Questions? We’ve Got Answers" />
            <div className="relative w-full space-y-5">
                {faqList?.map(({ title, description }, index) => {
                    const isActive = index === activeFaqIndex;

                    return (
                        <div
                            key={index}
                            style={{
                                borderRadius: isActive ? 20 : 50,
                            }}
                            className={`p-6 border-2 border-primary-200 cursor-pointer transition-all duration-500 ease-in-out ${
                                isActive ? 'border-primary-500 bg-primary-50' : 'hover:bg-bg-800'
                            }`}
                        >
                            <div
                                className={`flex items-center justify-between gap-6 transition-[padding] duration-500 ${
                                    !isActive && 'hover:px-[18px]'
                                }`}
                                onClick={() => toogleActiveFaq(index)}
                            >
                                <h4 className="font-medium">{title}</h4>

                                <PlusIcon
                                    className={cn(
                                        'text-primary-500 cursor-pointer',
                                        isActive ? 'rotate-45' : 'rotate-0'
                                    )}
                                />
                            </div>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    isActive ? 'opacity-100 mt-8' : 'opacity-0'
                                }`}
                                style={{ maxHeight: isActive ? '500px' : '0px' }}
                            >
                                <p className="p-sm lg:p-lg text-content-400">{description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </UserSectionWrapper>
    );
}
