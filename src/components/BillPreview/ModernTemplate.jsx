import React from 'react';

const ModernTemplate = ({ logo, documentType, companyDetails, items, tax, calculateSubtotal, calculateTotal }) => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex justify-between items-start mb-8">
        <div>
          {logo && <img src={logo} alt="Company Logo" className="h-20 mb-4" />}
          <h1 className="text-4xl font-bold capitalize text-blue-600">{documentType}</h1>
        </div>
        <div className="text-right">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-blue-600 mb-2">Company Details</h2>
            {Object.entries(companyDetails).map(([key, value]) => (
              <p key={key} className="capitalize text-gray-600">
                {value}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200">
              <th className="text-left py-3 text-blue-600">Description</th>
              <th className="text-right py-3 text-blue-600">Quantity</th>
              <th className="text-right py-3 text-blue-600">Price</th>
              <th className="text-right py-3 text-blue-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-blue-100">
                <td className="py-3">{item.description}</td>
                <td className="text-right py-3">{item.quantity}</td>
                <td className="text-right py-3">${item.price.toFixed(2)}</td>
                <td className="text-right py-3">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-right">
          <p className="mb-2 text-gray-600">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          <p className="mb-2 text-gray-600">Tax ({tax}%): ${(calculateSubtotal() * tax / 100).toFixed(2)}</p>
          <p className="text-2xl font-bold text-blue-600">Total: ${calculateTotal().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;