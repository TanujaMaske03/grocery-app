import { Link } from "react-router-dom";

import Button from "../components/Button";

const NotFound = () => {
      return (

    <div className="min-h-[80vh] flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-9xl font-extrabold text-error">

          404

        </h1>

        <h2 className="text-4xl font-bold mt-4">

          Page Not Found

        </h2>

        <p className="mt-4 max-w-lg mx-auto text-gray-500">

          Sorry! The page you are looking for doesn't exist,
          has been moved or the URL is incorrect.

        </p>

        <div className="mt-8">          <Link to="/">

            <Button>

              Back To Home

            </Button>

          </Link>

        </div>

      </div>

    </div>

  );
};

export default NotFound;