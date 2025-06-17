import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, CheckCircle, AlertCircle } from 'lucide-react';

const UploadGaleria = ({ ensaioId, onUploadComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!ensaioId) {
      alert('Selecione um ensaio primeiro');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    
    // Adicionar ensaioId
    formData.append('ensaioId', ensaioId);
    
    // Adicionar arquivos
    acceptedFiles.forEach((file) => {
      formData.append('fotos', file);
    });

    try {
      const response = await fetch('/api/v1/upload/fotos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setUploadedFiles(prev => [...prev, ...result.fotos]);
        
        if (onUploadComplete) {
          onUploadComplete(result.fotos);
        }
        
        alert(`${result.fotos.length} fotos enviadas com sucesso!`);
      } else {
        const error = await response.json();
        alert(`Erro no upload: ${error.error}`);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao enviar fotos');
    } finally {
      setUploading(false);
    }
  }, [ensaioId, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    maxFiles: 50,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Área de Drop */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          
          {isDragActive ? (
            <p className="text-lg text-blue-600">
              Solte as fotos aqui...
            </p>
          ) : (
            <div>
              <p className="text-lg text-gray-600 mb-2">
                Arraste e solte fotos aqui, ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500">
                Suporta JPEG, PNG, WebP • Máximo 10MB por foto • Até 50 fotos
              </p>
            </div>
          )}
          
          {uploading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Enviando fotos...</span>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Fotos Enviadas */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Fotos Enviadas ({uploadedFiles.length})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {uploadedFiles.map((foto, index) => (
              <div key={foto.id || index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="mt-2 text-xs text-gray-600 truncate">
                  {foto.nomeArquivo}
                </div>
                
                <div className="text-xs text-gray-500">
                  {foto.largura}x{foto.altura}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informações do Ensaio */}
      {ensaioId && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Ensaio ID:</strong> {ensaioId}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            As fotos serão organizadas automaticamente neste ensaio
          </p>
        </div>
      )}

      {/* Instruções */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Dicas para Upload:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use fotos em alta resolução para melhor qualidade</li>
          <li>• Organize as fotos por ensaio para facilitar a gestão</li>
          <li>• Thumbnails são gerados automaticamente</li>
          <li>• Você pode reordenar as fotos após o upload</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadGaleria;

