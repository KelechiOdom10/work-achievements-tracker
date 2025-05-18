import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Briefcase, ChevronDown, Plus } from "lucide-react";

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
                className={cn(
                  "w-full text-left justify-between px-2 py-2",
                  isCollapsed && "justify-center -ml-2.5"
                )}
              >
                <Briefcase className="h-5 w-5" />
                {!isCollapsed && (
                  <>
                    <span className="flex-grow ml-2 truncate">
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
