import React from 'react';
import { GraduationCap, RefreshCw } from 'lucide-react';

export default function Navbar({ onRefresh, isLoading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Portal</h1>
              <p className="text-xs text-slate-500">Spring Boot + Vite React CRUD Application</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh data from server"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
