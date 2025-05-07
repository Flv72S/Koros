'use client'

import { useState, useEffect } from 'react'
import { mainMenu, MenuItem, validateMenu } from '../config/menu'

export default function AdminPage() {
  const [menu, setMenu] = useState<MenuItem[]>(mainMenu)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Carica il contenuto del file quando viene selezionata una voce
  useEffect(() => {
    if (selectedItem) {
      fetch(selectedItem.content.source)
        .then(res => res.text())
        .then(text => setContent(text))
        .catch(err => console.error('Errore nel caricamento del contenuto:', err))
    }
  }, [selectedItem])

  // Salva le modifiche
  const handleSave = async () => {
    if (!selectedItem) return

    try {
      // Salva il contenuto
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedItem.content.source,
          content
        })
      })

      if (!response.ok) throw new Error('Errore nel salvataggio')

      // Aggiorna il menu
      const updatedMenu = menu.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            content: {
              ...item.content,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          }
        }
        return item
      })

      setMenu(updatedMenu)
      setIsEditing(false)
      alert('Modifiche salvate con successo!')
    } catch (error) {
      console.error('Errore nel salvataggio:', error)
      alert('Errore nel salvataggio delle modifiche')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Gestione Menu e Contenuti
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar con la struttura del menu */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-4">Struttura Menu</h2>
                  <div className="space-y-2">
                    {menu.map(item => (
                      <div key={item.id}>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            selectedItem?.id === item.id
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {item.label}
                        </button>
                        {item.children && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map(child => (
                              <button
                                key={child.id}
                                onClick={() => setSelectedItem(child)}
                                className={`w-full text-left px-3 py-1 rounded-md text-sm ${
                                  selectedItem?.id === child.id
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100'
                                }`}
                              >
                                {child.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Editor del contenuto */}
              <div className="md:col-span-2">
                {selectedItem ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        {selectedItem.label}
                      </h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                      >
                        {isEditing ? 'Annulla' : 'Modifica'}
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="space-y-4">
                        <textarea
                          value={content}
                          onChange={e => setContent(e.target.value)}
                          className="w-full h-96 p-4 border rounded-md font-mono"
                        />
                        <div className="flex justify-end space-x-4">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border rounded-md hover:bg-gray-50"
                          >
                            Annulla
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                          >
                            Salva
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap">{content}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    Seleziona una voce dal menu per visualizzare o modificare il contenuto
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 