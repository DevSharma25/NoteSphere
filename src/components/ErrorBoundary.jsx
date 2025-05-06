import { Component } from 'react';
import { useTheme } from '../context/ThemeContext';

class ErrorBoundary extends Component {
  state = { 
    hasError: false, 
    error: null,
    errorInfo: null 
  };

  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      error,
      errorInfo: { componentStack: error.stack } 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  };

  renderErrorDisplay() {
    const { error, errorInfo } = this.state;
    const { themeStyles = {} } = this.props;
    const {
      bg = 'bg-gray-100 dark:bg-gray-900',
      text = 'text-gray-800 dark:text-gray-200',
      button = 'bg-blue-500 hover:bg-blue-600',
      card = 'bg-white dark:bg-gray-800'
    } = themeStyles;

    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${bg} ${text}`}>
        <div className={`${card} p-6 rounded-lg shadow-xl w-full max-w-md border ${this.props.borderColor || 'border-red-400/30'}`}>
          <h2 className="text-2xl font-bold mb-3">⚠️ Application Error</h2>
          
          <div className="mb-4 text-left space-y-2">
            <p className="font-medium">Error details:</p>
            <code className="block p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded text-sm overflow-x-auto">
              {error?.toString()}
            </code>
          </div>

          {errorInfo?.componentStack && (
            <details className="mb-4 text-sm">
              <summary className="cursor-pointer font-medium">Technical details</summary>
              <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded overflow-x-auto">
                {errorInfo.componentStack}
              </pre>
            </details>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={this.handleReset}
              className={`px-4 py-2 ${button} text-white rounded transition-colors`}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorDisplay();
    }
    return this.props.children;
  }
}

export const ThemedErrorBoundary = ({ children, ...props }) => {
  const { currentTheme } = useTheme() || {};
  
  return (
    <ErrorBoundary 
      {...props}
      themeStyles={{
        bg: currentTheme?.bg,
        text: currentTheme?.text,
        button: currentTheme?.button?.replace('hover:', '').split(' ')[0],
        card: currentTheme?.card
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;