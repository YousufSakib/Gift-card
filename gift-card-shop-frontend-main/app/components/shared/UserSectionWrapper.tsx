import { cn } from '~/lib/cn';

type Props = { children: React.ReactNode; id?: string; className?: string };

export default function UserSectionWrapper(props: Props) {
    return (
        <section id={props?.id} className="container">
            <div
                className={cn(
                    'py-[2.5rem] lg:py-[5rem] flex flex-col gap-6 lg:gap-14',
                    props.className
                )}
            >
                {props.children}
            </div>
        </section>
    );
}
