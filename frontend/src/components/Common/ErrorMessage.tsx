import React from 'react';

interface ErrorMessageProps {
  message: string;
  backend?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, backend }) => (
  <div className="card text-center py-12">
    <p className="text-red-400 text-lg mb-4">{message}</p>
    {backend && message.includes('Backend server is not running') && (
      <div className="bg-yellow-900/50 p-4 rounded-lg border border-yellow-500/30 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2">How to fix:</h3>
        <ol className="text-yellow-200 list-decimal list-inside space-y-1 text-sm">
          <li>Open a terminal in the backend directory</li>
          <li>Run: <code className="bg-yellow-800 px-2 py-1 rounded">npm start</code> or <code className="bg-yellow-800 px-2 py-1 rounded">node server.js</code></li>
          <li>Make sure the server is running on port 5000</li>
        </ol>
      </div>
    )}
  </div>
);

export default ErrorMessage; 