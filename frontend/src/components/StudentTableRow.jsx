import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, User } from 'lucide-react';

export default function StudentTableRow({
  student,
  isEditing,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const [showInlineConfirm, setShowInlineConfirm] = useState(false);

  const handleConfirmDelete = async () => {
    await onDelete(student.id);
    setShowInlineConfirm(false);
  };

  return (
    <tr
      className={`transition-colors border-b border-slate-100 ${
        isEditing
          ? 'bg-indigo-50/70 border-indigo-200 ring-1 ring-indigo-300'
          : 'hover:bg-slate-50/80'
      }`}
    >
      {/* Student ID */}
      <td className="px-4 py-3.5 whitespace-nowrap text-xs font-mono font-bold text-slate-500">
        #{student.id}
      </td>

      {/* Name with avatar placeholder */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
            {student.firstname ? student.firstname.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {student.firstname} {student.lastname}
            </div>
            <div className="text-xs text-slate-400">
              {student.firstname?.toLowerCase()}.{student.lastname?.toLowerCase()}
            </div>
          </div>
        </div>
      </td>

      {/* Course Badge */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          {student.course || 'N/A'}
        </span>
      </td>

      {/* Section Badge */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          {student.section || 'N/A'}
        </span>
      </td>

      {/* Action Buttons / Inline Delete Confirmation (NO MODAL) */}
      <td className="px-4 py-3.5 whitespace-nowrap text-right">
        {showInlineConfirm ? (
          <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 rounded-lg p-1 animate-in fade-in">
            <span className="text-xs font-semibold text-rose-700 px-1">Delete?</span>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors cursor-pointer disabled:opacity-50"
              title="Confirm Delete"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => setShowInlineConfirm(false)}
              disabled={isDeleting}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
              <span>No</span>
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-1.5">
            <button
              onClick={() => onEdit(student)}
              className={`inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isEditing
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'text-slate-700 bg-white border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
              }`}
              title="Edit Student"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Editing' : 'Edit'}</span>
            </button>
            <button
              onClick={() => setShowInlineConfirm(true)}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 rounded-lg transition-all cursor-pointer"
              title="Delete Student"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
