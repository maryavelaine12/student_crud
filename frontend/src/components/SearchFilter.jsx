import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  courses,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students by name, course, section, or ID..."
          className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter by Course & Counter */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="pl-8 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="ALL">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs font-semibold px-2.5 py-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-200 shrink-0">
          {filteredCount} of {totalCount} {totalCount === 1 ? 'Student' : 'Students'}
        </div>
      </div>
    </div>
  );
}
