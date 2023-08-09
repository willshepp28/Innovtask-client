import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-3">404</h1>
        <p className="lead">Page Not Found</p>
        <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      </div>
    </div>
  );
};

export default NotFound;
