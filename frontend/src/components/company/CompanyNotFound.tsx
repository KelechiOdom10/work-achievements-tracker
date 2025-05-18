import { Link } from "@tanstack/react-router";
import { Building2, Home, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CompanyNotFound = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Company Not Found
          </CardTitle>
          <CardDescription className="mt-2">
            We couldn't find the company you're looking for. It may have been
            deleted or you might not have access to it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Check that the company URL is correct</span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <Plus className="h-4 w-4" />
              <span>Create a new company if needed</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="default" className="w-full">
            <Link to="/app" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/app/companies/new" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Company
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
