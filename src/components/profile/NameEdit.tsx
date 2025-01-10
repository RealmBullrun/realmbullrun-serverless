import { useState, useEffect } from "react"
import { Input } from "../ui/input"

export default function NameEdit({ value, onEdit }: { value: string, onEdit: Function }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(value)

  useEffect(() => {
    setEditingValue(value)
  }, [value])

  return isEditing ? (

    <Input
      autoFocus
      className="w-full mx-auto"
      value={editingValue}
      onChange={(event: any) => setEditingValue(event.target.value)}
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          setIsEditing(false)
          onEdit(editingValue)
        }
      }}
      onBlur={() => {
        setIsEditing(false)
        onEdit(editingValue)
      }}
    />
  ) : (
    <div className="w-full mx-auto">
      <p className="text-gray-600 -mb-2">Name</p>
      <div className="cursor-pointer" onClick={() => {
        setEditingValue(editingValue)
        setIsEditing(true)
      }}>
        {value}
      </div>
    </div>
  )
}