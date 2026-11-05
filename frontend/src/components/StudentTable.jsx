import React from 'react';
import StudentTableRow from './StudentTableRow';
import { Users, Loader2 } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  editingStudentId,
  onEdit,
  onDelete,
  deletingId,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-sm font-medium">Loading students from database...</span>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-base font-semibold text-slate-800">No students found</span>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Get started by filling out the form on the left or try adjusting your search filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  isEditing={editingStudentId === student.id}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={deletingId === student.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
