import React, { useState } from 'react';
import { delegates } from './data';
import { DelegatesTable } from './components/DelegatesTable';
import { FilterState } from './types';
import { Users } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    position: '',
    search: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">Delegates Directory</h1>
            </div>
            <div className="text-sm text-gray-500">
              {delegates.length} delegates
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DelegatesTable 
          delegates={delegates} 
          filters={filters}
          onFilterChange={setFilters}
        />
      </main>
    </div>
  );
}

export default App;