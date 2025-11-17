import EmbalaCarousel from '~/components/shared/EmblaCarousel';
import { featureSliderData } from '~/constants/data';

export default function FeaturesSlider() {
    return (
        <div className="hidden lg:block bg-primary-500 text-content-50 text-center py-10">
            <EmbalaCarousel
                options={{
                    loop: true,
                    axis: 'x',
                }}
                autoScrollSpeed={1}
            >
                {featureSliderData.map(({ title, icon: Icon }, index) => (
                    <div key={index} className="min-w-fit mx-10">
                        <div className="flex items-center gap-3">
                            <Icon className="size-10" />
                            <h2 className="font-oswald">{title}</h2>
                        </div>
                    </div>
                ))}
            </EmbalaCarousel>
        </div>
    );
}
