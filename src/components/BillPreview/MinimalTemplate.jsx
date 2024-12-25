import React from 'react';

const MinimalTemplate = ({ logo, documentType, companyDetails, items, tax, calculateSubtotal, calculateTotal }) => {
  return (
    <div className="p-8 bg-white">
      <div className="border-b pb-6 mb-8">
        <div className="flex justify-between items-center">
          {logo && <img src={logo} alt="Company Logo" className="h-16" />}
          <h1 className="text-2xl uppercase tracking-wider">{documentType}</h1>
        </div>
      </div>

      <div className="mb-8">
        {Object.entries(companyDetails).map(([key, value]) => (
          <p key={key} className="text-sm text-gray-600">
            {value}
          </p>
        ))}
      </div>

      <div className="mb-8">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <div className="flex-1">
              <p className="font-medium">{item.description}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax ({tax}%)</span>
          <span>${(calculateSubtotal() * tax / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;