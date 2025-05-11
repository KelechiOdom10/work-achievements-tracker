import { GuestLayout } from "@/components/layouts/GuestLayout";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <GuestLayout showNav showFooter>
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! Page not found
        </p>
        <Link to="/" className="text-blue-500 hover:text-blue-600 underline">
          Return to Home
        </Link>
      </div>
    </GuestLayout>
  );
};
