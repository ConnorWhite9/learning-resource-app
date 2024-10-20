import React, {useState, useEffect} from 'react';


const ErrorModal = ({ open, message, onClose}) => {
  const [isOpen, setIsOpen] = useState(open);
  
    // Update isOpen whenever the open prop changes
  useEffect(() => {
      setIsOpen(open);
  }, [open]);

  

  if (isOpen) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Oops! Sorry It Appears There Was An Error</h2>
            <p className="mb-4">{message} If the error persists please contact us and let us know.</p>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      );
  } else {
    return; 
  }

 

  
};

export default ErrorModal;