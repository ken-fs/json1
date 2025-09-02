'use client'

interface JsonTreeViewProps {
  data: any
  level?: number
}

export default function JsonTreeView({ data, level = 0 }: JsonTreeViewProps) {
  const indent = level * 20

  const renderValue = (key: string | number, value: any): JSX.Element => {
    if (value === null) {
      return (
        <div className="flex items-center" style={{ marginLeft: `${indent}px` }}>
          <span className="text-blue-600 font-medium">{key}:</span>
          <span className="text-gray-500 ml-2">null</span>
        </div>
      )
    }

    if (typeof value === 'boolean') {
      return (
        <div className="flex items-center" style={{ marginLeft: `${indent}px` }}>
          <span className="text-blue-600 font-medium">{key}:</span>
          <span className="text-orange-600 ml-2">{value.toString()}</span>
        </div>
      )
    }

    if (typeof value === 'number') {
      return (
        <div className="flex items-center" style={{ marginLeft: `${indent}px` }}>
          <span className="text-blue-600 font-medium">{key}:</span>
          <span className="text-green-600 ml-2">{value}</span>
        </div>
      )
    }

    if (typeof value === 'string') {
      return (
        <div className="flex items-center" style={{ marginLeft: `${indent}px` }}>
          <span className="text-blue-600 font-medium">{key}:</span>
          <span className="text-red-600 ml-2">"{value}"</span>
        </div>
      )
    }

    if (Array.isArray(value)) {
      return (
        <div style={{ marginLeft: `${indent}px` }}>
          <div className="text-blue-600 font-medium">{key}: [</div>
          {value.map((item, index) => (
            <JsonTreeView key={index} data={{ [index]: item }} level={level + 1} />
          ))}
          <div style={{ marginLeft: `${indent}px` }} className="text-gray-600">]</div>
        </div>
      )
    }

    if (typeof value === 'object') {
      return (
        <div style={{ marginLeft: `${indent}px` }}>
          <div className="text-blue-600 font-medium">{key}: {'{'}</div>
          <JsonTreeView data={value} level={level + 1} />
          <div style={{ marginLeft: `${indent}px` }} className="text-gray-600">}</div>
        </div>
      )
    }

    return <div style={{ marginLeft: `${indent}px` }}>Unknown type</div>
  }

  return (
    <div className="font-mono text-sm">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-1">
          {renderValue(key, value)}
        </div>
      ))}
    </div>
  )
}