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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">JSON Parser & Formatter</h1>
          <p className="text-lg text-gray-600">Parse, format, validate and minify JSON data</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setMode('format')}
              className={`px-4 py-2 rounded-md font-medium ${
                mode === 'format'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Format
            </button>
            <button
              onClick={() => setMode('minify')}
              className={`px-4 py-2 rounded-md font-medium ${
                mode === 'minify'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Minify
            </button>
            <button
              onClick={() => setMode('validate')}
              className={`px-4 py-2 rounded-md font-medium ${
                mode === 'validate'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Validate
            </button>
            <button
              onClick={() => setMode('tree')}
              className={`px-4 py-2 rounded-md font-medium ${
                mode === 'tree'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tree View
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
                Input JSON
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                  Output
                </label>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Copy
                  </button>
                )}
              </div>
              {viewMode === 'tree' && output ? (
                <div className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 overflow-auto">
                  <JsonTreeView data={JSON.parse(output)} />
                </div>
              ) : (
                <textarea
                  id="output"
                  value={output}
                  readOnly
                  placeholder="Processed JSON will appear here..."
                  className="w-full h-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 font-mono text-sm"
                />
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleProcess}
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {mode === 'format' ? 'Format' : mode === 'minify' ? 'Minify' : mode === 'validate' ? 'Validate' : 'Tree View'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Format JSON</h3>
              <p className="text-gray-600">Beautify and indent JSON for better readability</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Minify JSON</h3>
              <p className="text-gray-600">Compress JSON by removing whitespace</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Validate JSON</h3>
              <p className="text-gray-600">Check if your JSON syntax is valid</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Tree View</h3>
              <p className="text-gray-600">Visualize JSON structure in an interactive tree</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}