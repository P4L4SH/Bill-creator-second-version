import React from 'react';

const ClassicTemplate = ({ logo, documentType, companyDetails, items, tax, calculateSubtotal, calculateTotal }) => {
  return (
    <div className="p-8 bg-white">
      <div className="flex justify-between items-start mb-8">
        {logo && <img src={logo} alt="Company Logo" className="h-20" />}
        <h1 className="text-3xl font-bold capitalize">{documentType}</h1>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Company Details</h2>
        {Object.entries(companyDetails).map(([key, value]) => (
          <p key={key} className="capitalize">
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>

      <table className="w-full mb-8">
        <thead className="border-b-2">
          <tr>
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Quantity</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.description}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">${item.price.toFixed(2)}</td>
              <td className="text-right py-2">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <p className="mb-2">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        <p className="mb-2">Tax ({tax}%): ${(calculateSubtotal() * tax / 100).toFixed(2)}</p>
        <p className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ClassicTemplate;