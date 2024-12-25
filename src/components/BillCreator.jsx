import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CompanyDetails from './BillForm/CompanyDetails';
import ItemsList from './BillForm/ItemsList';
import TaxCalculation from './BillForm/TaxCalculation';
import ClassicTemplate from './BillPreview/ClassicTemplate';
import ModernTemplate from './BillPreview/ModernTemplate';
import MinimalTemplate from './BillPreview/MinimalTemplate';

const BillCreator = () => {
  const [logo, setLogo] = useState(null);
  const [documentType, setDocumentType] = useState('invoice');
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [tax, setTax] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${documentType}-${companyDetails.name || 'document'}`,
    pageStyle: '@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }',
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + (subtotal * tax / 100);
  };

  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate
  };

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Bill</h1>
            <CompanyDetails
              companyDetails={companyDetails}
              setCompanyDetails={setCompanyDetails}
              handleLogoUpload={handleLogoUpload}
              documentType={documentType}
              setDocumentType={setDocumentType}
            />
            <ItemsList
              items={items}
              updateItem={updateItem}
              addItem={addItem}
              removeItem={removeItem}
            />
            <TaxCalculation
              tax={tax}
              setTax={setTax}
              calculateSubtotal={calculateSubtotal}
              calculateTotal={calculateTotal}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Template</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(templates).map((template) => (
                  <button
                    key={template}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-3 rounded-lg capitalize transition-all ${
                      selectedTemplate === template
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              </div>
              <div ref={componentRef} className="p-6">
                <SelectedTemplate
                  logo={logo}
                  documentType={documentType}
                  companyDetails={companyDetails}
                  items={items}
                  tax={tax}
                  calculateSubtotal={calculateSubtotal}
                  calculateTotal={calculateTotal}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handlePrint}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md font-medium"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillCreator;