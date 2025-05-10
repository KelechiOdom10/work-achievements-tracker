
import { ReactNode } from "react";
import { Nav, NavProps } from "./Nav";
import { Footer, FooterProps } from "./Footer";

type NavPropsDiscriminated =
  | { showNav: true; navProps?: NavProps }
  | { showNav: false; navProps?: never };

type FooterPropsDiscriminated =
  | { showFooter: true; footerProps?: FooterProps }
  | { showFooter: false; footerProps?: never };

export type GuestLayoutProps = {
  children: ReactNode;
  className?: string;
} & NavPropsDiscriminated & FooterPropsDiscriminated;

export function GuestLayout(props: GuestLayoutProps) {
  const { children, className = "" } = props;
  return (
    <div className={`flex min-h-screen flex-col bg-[#FCFCFC] dark:bg-background ${className}`}>
      {props.showNav && <Nav {...(props.navProps || {})} />}
      <main className="flex-1">{children}</main>
      {props.showFooter && <Footer {...(props.footerProps || {})} />}
    </div>
  );
}
