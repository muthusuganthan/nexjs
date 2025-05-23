'use client';

const Error = ({ error, reset }) => {
    return (
        <>
            <p>error page {error.message}</p>
        </>
    );
};

export default Error;