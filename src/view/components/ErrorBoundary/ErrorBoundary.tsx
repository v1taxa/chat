// // Core
import React, { Component } from 'react';

interface State {
    error: Error | null;
}

export class ErrorBoundary extends Component {

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    state: State = {
        error: null,
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error === null) {
            return children;
        }

        return (
            <div>
                <h3>На данной странице произошла ошибка.</h3>
                <details>
                    {error.toString()}
                </details>
            </div>
        );
    }

}

