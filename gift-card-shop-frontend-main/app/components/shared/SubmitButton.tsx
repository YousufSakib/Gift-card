import Button from './Button';
import Loader from './Loader';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading: boolean;
    title: string;
    loadingText: string;
};

export default function SubmitButton(props: Props) {
    const { loading, title, loadingText, ...rest } = props;

    return (
        <Button
            title={loading ? '' : title}
            type="submit"
            disabled={loading}
            icon={loading && <Loader text={loadingText} />}
            iconPosition="before"
            {...rest}
        />
    );
}
