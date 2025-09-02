'use client'

import { useState } from 'react'
import JsonTreeView from './JsonTreeView'

interface JsonParserProps {}

export default function JsonParser({}: JsonParserProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'format' | 'minify' | 'validate' | 'tree'>('format')
  const [viewMode, setViewMode] = useState<'text' | 'tree'>('text')

  const formatJson = (text: string): string => {
    try {
      const parsed = JSON.parse(text)
      return JSON.stringify(parsed, null, 2)
    } catch (err) {
      throw new Error('Invalid JSON format')
    }
  }

  const minifyJson = (text: string): string => {
    try {
      const parsed = JSON.parse(text)
      return JSON.stringify(parsed)
    } catch (err) {
      throw new Error('Invalid JSON format')
    }
  }

  const validateJson = (text: string): string => {
    try {
      JSON.parse(text)
      return 'Valid JSON ✓'
    } catch (err) {
      throw new Error(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleProcess = () => {
    setError('')
    setOutput('')
    
    if (!input.trim()) {
      setError('Please enter JSON text to process')
      return
    }

    try {
      let result = ''
      switch (mode) {
        case 'format':
          result = formatJson(input)
          break
        case 'minify':
          result = minifyJson(input)
          break
        case 'validate':
          result = validateJson(input)
          break
        case 'tree':
          result = formatJson(input)
          setViewMode('tree')
          break
      }
      setOutput(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
    setViewMode('text')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
    } catch (err) {
      console.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            JSON Parser & Formatter
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Parse, format, validate and minify JSON data with our powerful online tool
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setMode('format')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'format'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              🎨 Format
            </button>
            <button
              onClick={() => setMode('minify')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'minify'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              🗜️ Minify
            </button>
            <button
              onClick={() => setMode('validate')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'validate'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              ✅ Validate
            </button>
            <button
              onClick={() => setMode('tree')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                mode === 'tree'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              🌳 Tree View
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="input" className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                📝 Input JSON
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here...&#10;&#10;Example:&#10;{&#10;  \"name\": \"John Doe\",&#10;  \"age\": 30,&#10;  \"city\": \"New York\"&#10;}"
                className="w-full h-80 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-gray-50 hover:bg-white transition-colors duration-200 resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="output" className="flex items-center text-lg font-semibold text-gray-800">
                  📤 Output
                </label>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    📋 Copy
                  </button>
                )}
              </div>
              {viewMode === 'tree' && output ? (
                <div className="w-full h-80 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white overflow-auto">
                  <JsonTreeView data={JSON.parse(output)} />
                </div>
              ) : (
                <textarea
                  id="output"
                  value={output}
                  readOnly
                  placeholder="Processed JSON will appear here...&#10;&#10;✨ Beautiful formatting&#10;🗜️ Space optimization&#10;✅ Syntax validation&#10;🌳 Interactive tree view"
                  className="w-full h-80 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white font-mono text-sm resize-none"
                />
              )}
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-xl mr-3">❌</span>
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleProcess}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>⚡</span>
              {mode === 'format' ? 'Format JSON' : mode === 'minify' ? 'Minify JSON' : mode === 'validate' ? 'Validate JSON' : 'Generate Tree'}
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>🗑️</span>
              Clear All
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✨ Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Format JSON</h3>
              <p className="text-gray-600">Beautify and indent JSON for better readability and structure</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4">🗜️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Minify JSON</h3>
              <p className="text-gray-600">Compress JSON by removing unnecessary whitespace and formatting</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Validate JSON</h3>
              <p className="text-gray-600">Check if your JSON syntax is valid and get detailed error messages</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-4">🌳</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Tree View</h3>
              <p className="text-gray-600">Visualize JSON structure in an interactive, expandable tree format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}