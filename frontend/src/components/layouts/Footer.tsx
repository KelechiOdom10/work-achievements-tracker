import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export interface FooterProps {
  hide?: boolean;
}

export function Footer({ hide }: FooterProps) {
  if (hide) return null;

  const sections = [
    {
      title: "Product",
      links: [
        { label: "Features", hash: "#features" },
        { label: "Pricing", hash: "#pricing" },
        { label: "Integrations", hash: "#integrations" },
        { label: "Changelog", hash: "#changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", hash: "#blog" },
        { label: "Guides", hash: "#guides" },
        { label: "Support", hash: "#support" },
        { label: "API", hash: "#api" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", hash: "#about" },
        { label: "Careers", hash: "#careers" },
        { label: "Privacy", hash: "#privacy" },
        { label: "Terms", hash: "#terms" },
      ],
    },
    // {
    //   title: "Social",
    //   links: [
    //     {
    //       label: (
    //         <>
    //           <span className="sr-only">Twitter</span>
    //           <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    //             <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.3 1.64 4.57c-.37.63-.59 1.36-.59 2.14 0 1.48.75 2.78 1.89 3.55-.7-.02-1.36-.21-1.94-.53v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.16-1.13.16-.28 0-.54-.03-.81-.08.54 1.69 2.11 2.92 3.97 2.95A8.6 8.6 0 0 1 2 19.54 12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0 0 22.46 6z" />
    //           </svg>
    //         </>
    //       ),
    //       hash: "#twitter",
    //     },
    //     {
    //       label: (
    //         <>
    //           <span className="sr-only">LinkedIn</span>
    //           <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    //             <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v5.56zm-7.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75z" />
    //           </svg>
    //         </>
    //       ),
    //       hash: "#linkedin",
    //     },
    //     {
    //       label: (
    //         <>
    //           <span className="sr-only">GitHub</span>
    //           <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    //             <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.017-2.25-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.921.43.372.823 1.104.823 2.224 0 1.606-.014 2.898-.014 3.293 0 .322.216.699.825.581C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
    //           </svg>
    //         </>
    //       ),
    //       hash: "#github",
    //     },
    //   ],
    // },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4 md:max-w-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold tracking-tight">
                Achieve
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The professional achievement tracking platform that helps you
              document, organize, and leverage your work accomplishments.
            </p>
          </div>
          <div
            className="
  grid grid-cols-2 gap-8
  md:flex md:gap-12 md:ml-auto
"
          >
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="text-sm font-semibold">{section.title}</div>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li
                      key={
                        typeof link.label === "string" ? link.label : link.hash
                      }
                    >
                      <Link
                        to="."
                        hash={link.hash}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Achieve. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link
              to="."
              hash="#twitter"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link
              to="."
              hash="#linkedin"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
            <Link
              to="."
              hash="#github"
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
