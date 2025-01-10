import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export default function DescriptionEdit({ value, onEdit }: { value: string, onEdit: Function }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(value)

  useEffect(() => {
    setEditingValue(value)
  }, [value])
  
  return isEditing ? (
    <Textarea
      autoFocus
      className="w-full lg:mx-auto"
      value={editingValue}
      onChange={(event: any) => setEditingValue(event.target.value)}
      onKeyDown={(event: any) => {
        // if (event.key === "Enter") {
        //   setIsEditing(false)
        //   onEdit(editingValue)
        // }
      }}
      onBlur={() => {
        setIsEditing(false)
        onEdit(editingValue)
      }}
    />
  ) : (
    <div className="w-full mx-auto">
      <p className="text-gray-600 -mb-2">Description/Bio</p>
      <div className="cursor-pointer wrap-anywhere" onClick={() => {
        setEditingValue(editingValue)
        setIsEditing(true)
      }}>
        {value}
      </div>
    </div>
  )
}