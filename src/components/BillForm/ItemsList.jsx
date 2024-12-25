import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const ItemsList = ({ items, updateItem, addItem, removeItem }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Items</h2>
        <button
          onClick={addItem}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Item description"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-700">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            </div>
            {items.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove Item
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;