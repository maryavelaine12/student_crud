import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, XCircle, RotateCcw, AlertTriangle, Loader2 } from 'lucide-react';

export default function StudentForm({
  editingStudent,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [validationError, setValidationError] = useState('');

  // Synchronize form values whenever editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setValidationError('');
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setValidationError('');
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.lastname.trim()) {
      setValidationError('First name and last name are required.');
      return;
    }

    if (!formData.course.trim()) {
      setValidationError('Course is required.');
      return;
    }

    if (!formData.section.trim()) {
      setValidationError('Section is required.');
      return;
    }

    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    });
    setValidationError('');
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden sticky top-20">
      {/* Card Header */}
      <div
        className={`px-5 py-4 border-b flex items-center justify-between ${
          isEditMode
            ? 'bg-amber-50/70 border-amber-200 text-amber-900'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          {isEditMode ? (
            <div className="p-1.5 bg-amber-600 text-white rounded-lg">
              <UserCheck className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
              <UserPlus className="w-4 h-4" />
            </div>
          )}
          <div>
            <h2 className="text-sm font-bold">
              {isEditMode ? `Edit Student (#${editingStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? 'Update fields and save changes'
                : 'Enter student information to enroll'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 rounded-md transition-colors cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {validationError && (
          <div className="flex items-center space-x-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg animate-in fade-in">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. Juan"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Dela Cruz"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Course */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Course <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. BSIT, BSCS, BSCpE, BSA"
            list="course-suggestions"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
          />
          <datalist id="course-suggestions">
            <option value="BSIT" />
            <option value="BSCS" />
            <option value="BSIS" />
            <option value="BSCpE" />
            <option value="BSA" />
          </datalist>
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Section <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="e.g. 3A, 4B, 1C"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer shadow-xs disabled:opacity-50 ${
              isEditMode
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isEditMode ? 'Saving...' : 'Adding...'}</span>
              </>
            ) : isEditMode ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Add Student</span>
              </>
            )}
          </button>

          {!isEditMode && (
            <button
              type="button"
              onClick={handleReset}
              title="Clear input fields"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
