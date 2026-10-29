import React from 'react';

const Placeholder = ({ title }) => {
    return (
        <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
            <h1>{title}</h1>
            <p>This page is currently under implementation.</p>
        </div>
    );
};

export default Placeholder;
