import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronDown, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCompanies, useSwitchCompany } from "@/hooks/use-companies";
import { cn } from "@/lib/utils";

const companyInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export const CompanySwitcher: React.FC = () => {
  const { companySlug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { data: companiesData } = useCompanies();
  const switchCompany = useSwitchCompany();

  const companies = companiesData?.data?.companies ?? [];
  const activeCompany = companies.find(
    (company) => company.slug === companySlug
  );

  const handleCompanyChange = async (
    companyId: string,
    companySlug: string
  ) => {
    await switchCompany.mutateAsync(companyId, {
      onSuccess: () => {
        navigate({ to: `/app/companies/${companySlug}` });
      },
    });
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className={cn(
                  "w-full text-left justify-between pl-0.5 my-1 py-4",
                  isCollapsed && "justify-center -ml-0.5 pr-1"
                )}
              >
                <Avatar key={activeCompany?.id} className="h-9 w-9 rounded-sm">
                  <AvatarImage src={activeCompany?.logo ?? ""} />
                  <AvatarFallback className="rounded-sm">
                    {companyInitials(activeCompany?.name)}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <>
                    <span className="flex-grow ml-2 truncate text-foreground">
                      {activeCompany?.name || "Select Company"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              {activeCompany?.name || "Select Company"}
            </TooltipContent>
          )}
        </Tooltip>
        <DropdownMenuContent>
          {companies.map((company) => (
            <DropdownMenuItem
              key={company.id}
              onClick={() => handleCompanyChange(company.id, company.slug)}
              className={cn(
                "cursor-pointer",
                company.id === activeCompany?.id && "bg-input"
              )}
            >
              {company.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <Link to="/app/companies/new" className="cursor-pointer mt-1">
              <Plus className="h-4 w-4 mr-2" />
              Add New Company
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};
