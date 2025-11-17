import Button from "~/components/shared/Button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-surface-400">
      <div className="text-center">
        <h1 className="large-2 text-primary-500">404</h1>
        <h2 className="display-1 text-content-500 mt-4">
          Oops! Page not found.
        </h2>
        <p className="p-lg text-content-300 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8">
          <Button
            title="Go to Home"
            variant="default"
            size="lg"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
