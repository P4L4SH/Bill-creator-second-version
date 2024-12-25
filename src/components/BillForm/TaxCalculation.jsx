import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const TaxCalculation = ({ tax, setTax, calculateSubtotal, calculateTotal }) => {
  const subtotal = calculateSubtotal();
  const taxAmount = subtotal * (tax / 100);
  const total = calculateTotal();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Tax & Total</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={tax}
              onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax ({tax}%):</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculation;