//Core
import React from 'react';

export const PublicLayout: React.FC = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
};
