import React, { ErrorInfo, StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { App } from "./app";
import { router } from "./lib/router";

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  { hasError: boolean; error: Error | null; errorInfo: ErrorInfo | null }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Optionally log error to an error reporting service
  }
  render() {
    if (this.state.hasError) {
      return (
        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
          {String(this.state.error)}\n
          {this.state.errorInfo ? this.state.errorInfo.componentStack : ""}
        </pre>
      );
    }
    return this.props.children;
  }
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
