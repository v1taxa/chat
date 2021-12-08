//Core
import React from 'react';

export const PrivateLayout: React.FC = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
};
