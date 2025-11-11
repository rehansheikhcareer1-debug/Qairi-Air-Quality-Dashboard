import React, { useState } from 'react';

const TestAPI = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/test/');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setResult('Testing registration...');
    
    try {
      const testData = {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@test.com',
        password: 'test123456',
        password2: 'test123456',
        first_name: 'Test',
        last_name: 'User'
      };
      
      console.log('Sending:', testData);
      
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6">API Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Test GET API
          </button>
          
          <button
            onClick={testRegister}
            disabled={loading}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 ml-4"
          >
            Test Register API
          </button>
        </div>
        
        <div className="mt-6 bg-slate-800 p-4 rounded-lg">
          <h2 className="text-white font-bold mb-2">Result:</h2>
          <pre className="text-green-400 text-sm overflow-auto">{result}</pre>
        </div>
      </div>
    </div>
  );
};

export default TestAPI;
