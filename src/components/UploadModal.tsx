import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: string;
  clientName?: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, clientId, clientName }) => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [docType, setDocType] = useState('');
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Simulation de l'upload
      setTimeout(() => {
        onClose();
        setStep(1);
        setFiles([]);
        setDocType('');
      }, 1500);
    }
  };
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Dépôt de documents
                {clientName && <span className="ml-2 text-gray-500 font-normal">- Client: {clientName}</span>}
              </h2>
            </div>
            
            <div className="p-6 max-h-[calc(90vh-160px)] overflow-y-auto">
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Sélectionnez le type de document</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {['Carte d\'identité', 'Justificatif de domicile', 'Relevé bancaire', 'Contrat signé', 'Attestation', 'Autre'].map((type) => (
                      <motion.div
                        key={type}
                        className={`p-4 border rounded-lg cursor-pointer ${docType === type ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        onClick={() => setDocType(type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border ${docType === type ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'} flex items-center justify-center`}>
                            {docType === type && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 text-gray-700">{type}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Déposer vos documents</h3>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-2 text-gray-600">Glissez-déposez vos fichiers ici ou</p>
                    <motion.button 
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      Parcourir...
                    </motion.button>
                    <input 
                      id="fileInput" 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileInput} 
                    />
                    <p className="mt-2 text-xs text-gray-500">Formats acceptés: PDF, JPG, PNG (max 10 Mo)</p>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers sélectionnés ({files.length})</h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} Mo</p>
                              </div>
                            </div>
                            <motion.button 
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => removeFile(index)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Résumé et confirmation</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Type de document</p>
                        <p className="text-base font-medium text-gray-800">{docType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nombre de fichiers</p>
                        <p className="text-base font-medium text-gray-800">{files.length}</p>
                      </div>
                      {clientName && (
                        <div>
                          <p className="text-sm text-gray-500">Client</p>
                          <p className="text-base font-medium text-gray-800">{clientName}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-base font-medium text-gray-800">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg divide-y">
                    {files.map((file, index) => (
                      <div key={index} className="p-4 flex items-center">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-700 truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <div className="flex">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          En confirmant, vous acceptez les conditions de dépôt de documents.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              {step > 1 ? (
                <motion.button 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  onClick={handleBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retour
                </motion.button>
              ) : (
                <div></div>
              )}
              
              <motion.button 
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none ${
                  (step === 1 && !docType) || (step === 2 && files.length === 0)
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                onClick={handleNext}
                disabled={(step === 1 && !docType) || (step === 2 && files.length === 0)}
                whileHover={
                  (step === 1 && !docType) || (step === 2 && files.length === 0)
                    ? {}
                    : { scale: 1.05 }
                }
                whileTap={
                  (step === 1 && !docType) || (step === 2 && files.length === 0)
                    ? {}
                    : { scale: 0.95 }
                }
              >
                {step === 3 ? 'Confirmer le dépôt' : 'Suivant'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;
