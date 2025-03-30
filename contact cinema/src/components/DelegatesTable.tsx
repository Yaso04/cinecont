import React from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';
import { Delegate, FilterState } from '../types';

interface Props {
  delegates: Delegate[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function DelegatesTable({ delegates, filters, onFilterChange }: Props) {
  const countries = Array.from(new Set(delegates.map(d => d.country))).sort();
  const positions = Array.from(new Set(delegates.map(d => d.position))).sort();

  const filteredDelegates = delegates.filter(delegate => {
    const matchesCountry = !filters.country || delegate.country === filters.country;
    const matchesPosition = !filters.position || delegate.position === filters.position;
    const matchesSearch = !filters.search || 
      Object.values(delegate).some(value => 
        value.toLowerCase().includes(filters.search.toLowerCase())
      );
    return matchesCountry && matchesPosition && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search delegates..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.country}
            onChange={(e) => onFilterChange({ ...filters, country: e.target.value })}
          >
            <option value="">All Countries ({countries.length})</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.position}
            onChange={(e) => onFilterChange({ ...filters, position: e.target.value })}
          >
            <option value="">All Positions ({positions.length})</option>
            {positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Country</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDelegates.map((delegate, index) => (
              <tr 
                key={`${delegate.name}-${index}`}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="font-medium">{delegate.country}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{delegate.company}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{delegate.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600">{delegate.position}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {delegate.email && (
                      <a 
                        href={`mailto:${delegate.email}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        title={delegate.email}
                      >
                        <Mail size={16} />
                        <span className="hidden md:inline">Email</span>
                      </a>
                    )}
                    {delegate.phone && (
                      <a 
                        href={`tel:${delegate.phone}`}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        title={delegate.phone}
                      >
                        <Phone size={16} />
                        <span className="hidden md:inline">Phone</span>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
        <div>
          Showing {filteredDelegates.length} of {delegates.length} delegates
        </div>
        <div className="text-gray-500">
          {countries.length} countries • {positions.length} positions
        </div>
      </div>
    </div>
  );
}