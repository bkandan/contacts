import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { uploadContacts } from 'wasp/client/operations';

const UploadContactsPage = () => {
  const uploadContactsFn = useAction(uploadContacts);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        await uploadContactsFn({ file: event.target.result });
        setMessage('Contacts uploaded successfully!');
      } catch (error) {
        setMessage('Failed to upload contacts: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Contacts</h1>
      <input type="file" accept=".json" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default UploadContactsPage;
