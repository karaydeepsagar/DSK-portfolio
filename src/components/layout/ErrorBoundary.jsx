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
                    <h1 style={{ fontSize: '2rem', color: '#D10000' }}>Oops! Something went wrong</h1>
                    <p style={{ fontSize: '1rem', color: '#aaa', maxWidth: '600px', textAlign: 'center' }}>
                        {this.state.error ? this.state.error.message : 'An unexpected error occurred. Please try refreshing the page.'}
                    </p>
                    {this.state.error && (
                        <pre style={{
                            marginTop: '18px',
                            maxWidth: '840px',
                            width: '100%',
                            background: 'rgba(255,255,255,0.04)',
                            color: '#eee',
                            padding: '16px',
                            borderRadius: '12px',
                            overflowX: 'auto',
                            fontSize: '0.85rem',
                            lineHeight: '1.4'
                        }}>
                            {this.state.error.stack}
                        </pre>
                    )}
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
