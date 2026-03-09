import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: '#000',
                    color: '#fff',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px'
                }}>
                    <h1 style={{ fontSize: '2rem', color: '#B22222' }}>Oops! Something went wrong</h1>
                    <p style={{ fontSize: '1rem', color: '#aaa', maxWidth: '600px', textAlign: 'center' }}>
                        {/* FIX: Don't expose raw error.message in production UI — it may leak
                            internal paths, library versions, or stack hints to users.
                            The full error is logged to the console for developers. */}
                        An unexpected error occurred. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 30px',
                            background: '#B22222',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
