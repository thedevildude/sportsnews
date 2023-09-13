import React, { Component, ErrorInfo, ReactNode, ReactElement } from "react";

interface ErrorBoundaryProps {
  children: ReactElement | ReactElement[];
  fallback?: ReactElement | ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error or send it to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        this.props.fallback || (
          <div>
            <h2>Something went wrong.</h2>
            <p>{error?.message || "An error occurred."}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
