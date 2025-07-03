import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { uploadContactsCsv } from 'wasp/client/operations';

const UploadContactsPage = () => {
  const [csvData, setCsvData] = useState('');
  const uploadContactsCsvFn = useAction(uploadContactsCsv);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setCsvData(e.target.result);
    };

    reader.readAsText(file);
  };

  const handleUpload = () => {
    uploadContactsCsvFn({ csvData });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Upload Contacts</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4 border border-gray-300 rounded p-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadContactsPage;
