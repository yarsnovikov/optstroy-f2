"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    })

    this.setState({ errorInfo })

    if (process.env.NODE_ENV === "production") {
      // Here you could send error to monitoring service like Sentry
      // reportError(error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4 p-8 max-w-md">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Что-то пошло не так</h1>
            <p className="text-muted-foreground">
              Произошла неожиданная ошибка. Пожалуйста, попробуйте обновить страницу или вернуться назад.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left text-sm bg-muted p-4 rounded-md mt-4">
                <summary className="cursor-pointer font-medium">Детали ошибки (только в разработке)</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex gap-2 justify-center">
              <Button onClick={this.handleRetry} variant="outline" className="flex items-center gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Попробовать снова
              </Button>
              <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Обновить страницу
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
