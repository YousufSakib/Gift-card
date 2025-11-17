type Props = {
    title: string;
    subTitle: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function SignInCardWrapper(props: Props) {
    return (
        <div className="p-8 md:p-20 bg-surface-50 rounded-2xl">
            <div className="max-w-lg inline-flex flex-col justify-start items-center gap-10">
                <div className="flex flex-col gap-3">
                    <h2 className="font-oswald">{props.title}</h2>
                    <span className="p-md">{props.subTitle}</span>
                </div>

                <>{props.children}</>
            </div>
        </div>
    );
}
