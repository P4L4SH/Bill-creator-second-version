import React from 'react';

const CompanyDetails = ({ companyDetails, setCompanyDetails, handleLogoUpload, documentType, setDocumentType }) => {
  const handleInputChange = (field, value) => {
    setCompanyDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Document Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company Logo</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200 font-medium"
              >
                Choose File
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="invoice">Invoice</option>
              <option value="bill">Bill</option>
              <option value="quote">Quote</option>
              <option value="receipt">Receipt</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(companyDetails).map(([field, value]) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              {field === 'address' ? (
                <textarea
                  value={value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${field}`}
                  rows="2"
                />
              ) : (
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  value={value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${field}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;