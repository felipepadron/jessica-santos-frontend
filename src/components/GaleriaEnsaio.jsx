import React, { useState, useEffect } from 'react';
import { Image, Download, Trash2, Star, Eye, Grid, List } from 'lucide-react';

const GaleriaEnsaio = ({ ensaioId }) => {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [selectedFotos, setSelectedFotos] = useState([]);

  useEffect(() => {
    if (ensaioId) {
      carregarFotos();
    }
  }, [ensaioId]);

  const carregarFotos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/ensaios/${ensaioId}/fotos`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFotos(data.fotos);
      } else {
        console.error('Erro ao carregar fotos');
      }
    } catch (error) {
      console.error('Erro ao carregar fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletarFoto = async (fotoId) => {
    if (!confirm('Tem certeza que deseja deletar esta foto?')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/fotos/${fotoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setFotos(prev => prev.filter(foto => foto.id !== fotoId));
        alert('Foto deletada com sucesso');
      } else {
        alert('Erro ao deletar foto');
      }
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      alert('Erro ao deletar foto');
    }
  };

  const toggleDestaque = async (fotoId, destaque) => {
    try {
      const response = await fetch(`/api/v1/fotos/${fotoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ destaque: !destaque })
      });

      if (response.ok) {
        setFotos(prev => prev.map(foto => 
          foto.id === fotoId ? { ...foto, destaque: !destaque } : foto
        ));
      }
    } catch (error) {
      console.error('Erro ao atualizar destaque:', error);
    }
  };

  const toggleSelecao = (fotoId) => {
    setSelectedFotos(prev => 
      prev.includes(fotoId) 
        ? prev.filter(id => id !== fotoId)
        : [...prev, fotoId]
    );
  };

  const formatarTamanho = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Carregando galeria...</span>
      </div>
    );
  }

  if (fotos.length === 0) {
    return (
      <div className="text-center py-12">
        <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Nenhuma foto encontrada
        </h3>
        <p className="text-gray-500">
          Faça upload de fotos para este ensaio
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header da Galeria */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Galeria do Ensaio
          </h2>
          <p className="text-gray-600">
            {fotos.length} foto{fotos.length !== 1 ? 's' : ''} • Ensaio #{ensaioId}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ações em Lote */}
      {selectedFotos.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 mb-2">
            {selectedFotos.length} foto{selectedFotos.length !== 1 ? 's' : ''} selecionada{selectedFotos.length !== 1 ? 's' : ''}
          </p>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <Download className="w-4 h-4 inline mr-2" />
              Baixar Selecionadas
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              <Trash2 className="w-4 h-4 inline mr-2" />
              Deletar Selecionadas
            </button>
          </div>
        </div>
      )}

      {/* Grid de Fotos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="relative group">
              {/* Checkbox de Seleção */}
              <input
                type="checkbox"
                checked={selectedFotos.includes(foto.id)}
                onChange={() => toggleSelecao(foto.id)}
                className="absolute top-2 left-2 z-10"
              />
              
              {/* Destaque */}
              {foto.destaque && (
                <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-current z-10" />
              )}
              
              {/* Imagem */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              
              {/* Overlay com Ações */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleDestaque(foto.id, foto.destaque)}
                    className={`p-2 rounded-full ${foto.destaque ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800'}`}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deletarFoto(foto.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Info da Foto */}
              <div className="mt-2 text-xs text-gray-600">
                <p className="truncate">{foto.nomeArquivo}</p>
                <p>{foto.largura}x{foto.altura}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Lista de Fotos */
        <div className="space-y-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
              <input
                type="checkbox"
                checked={selectedFotos.includes(foto.id)}
                onChange={() => toggleSelecao(foto.id)}
              />
              
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold">{foto.nomeArquivo}</h4>
                <p className="text-sm text-gray-600">
                  {foto.largura}x{foto.altura} • {formatarTamanho(foto.tamanhoArquivo)}
                </p>
                <p className="text-xs text-gray-500">
                  Enviado em {new Date(foto.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {foto.destaque && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
                
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Eye className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => toggleDestaque(foto.id, foto.destaque)}
                  className="p-2 text-gray-600 hover:text-yellow-600"
                >
                  <Star className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => deletarFoto(foto.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaEnsaio;

