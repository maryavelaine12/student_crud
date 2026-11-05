import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import SearchFilter from './components/SearchFilter';
import Toast from './components/Toast';
import { studentApi } from './api/studentApi';
import { BookOpen, Users2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [toast, setToast] = useState(null);
  const [backendError, setBackendError] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setBackendError(null);
    try {
      const data = await studentApi.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setBackendError(
        'Unable to connect to the backend API at /buenaventura/students. Ensure your Spring Boot application is running on port 8080.'
      );
      showToast('Could not load students. Is the Spring Boot server running?', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        await studentApi.updateStudent(editingStudent.id, formData);
        showToast(`Student #${editingStudent.id} successfully updated!`, 'success');
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await studentApi.createStudent(formData);
        showToast(
          `Student "${created.firstname} ${created.lastname}" added successfully!`,
          'success'
        );
      }
      await loadStudents();
    } catch (err) {
      console.error('Form submission error:', err);
      showToast(err.message || 'Operation failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    // Smooth scroll to top on mobile screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await studentApi.deleteStudent(id);
      showToast(`Student #${id} was deleted.`, 'info');
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      await loadStudents();
    } catch (err) {
      console.error('Delete error:', err);
      showToast(err.message || 'Failed to delete student.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Extract distinct course list for filter dropdown
  const uniqueCourses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim().toUpperCase());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Client-side search and course filter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchCourse =
        selectedCourse === 'ALL' ||
        (student.course && student.course.trim().toUpperCase() === selectedCourse);

      if (!matchCourse) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
      const idMatch = String(student.id || '').includes(term);
      const courseMatch = String(student.course || '').toLowerCase().includes(term);
      const sectionMatch = String(student.section || '').toLowerCase().includes(term);

      return fullName.includes(term) || idMatch || courseMatch || sectionMatch;
    });
  }, [students, searchTerm, selectedCourse]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onRefresh={loadStudents} isLoading={isLoading} />

      <Toast toast={toast} onClose={() => setToast(null)} />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Connection Notice / Alert banner if backend is unreachable */}
        {backendError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-amber-950">Backend Connection Notice</p>
              <p className="text-amber-800 text-xs mt-0.5">{backendError}</p>
              <p className="text-xs text-amber-700 mt-2">
                Make sure your Spring Boot backend in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">/student</code> is started via <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.\mvnw.cmd spring-boot:run</code> on port 8080.
              </p>
            </div>
            <button
              onClick={loadStudents}
              className="px-3 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Top Summary Banner */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Registered</p>
              <p className="text-xl font-bold text-slate-900">{students.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Courses</p>
              <p className="text-xl font-bold text-slate-900">{uniqueCourses.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-xs text-slate-500 font-medium">Active Mode</p>
              <p className="text-sm font-bold text-slate-900">
                {editingStudent ? `Editing Student #${editingStudent.id}` : 'Enrollment (New Student)'}
              </p>
            </div>
            {editingStudent && (
              <button
                onClick={handleCancelEdit}
                className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer transition-colors"
              >
                Switch to Add
              </button>
            )}
          </div>
        </div>

        {/* Responsive Non-Modal Layout: Left Form Card + Right Table Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (4 cols on lg screens): Student Form Card */}
          <div className="lg:col-span-4 w-full">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column (8 cols on lg screens): Directory Table */}
          <div className="lg:col-span-8 w-full">
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={uniqueCourses}
              totalCount={students.length}
              filteredCount={filteredStudents.length}
            />

            <StudentTable
              students={filteredStudents}
              isLoading={isLoading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          Student CRUD System • Vite + React + Tailwind CSS • Spring Boot API at <code className="text-slate-600">/buenaventura/students</code>
        </div>
      </footer>
    </div>
  );
}
