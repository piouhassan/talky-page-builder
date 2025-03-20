
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, Layout, Copy, Settings, Home, Users, FileText, BarChart, LayoutGrid } from "lucide-react";

const Index = () => {
  const recentProjects = [
    { id: '1', name: 'Page d\'accueil', lastEdited: '2 heures' },
    { id: '2', name: 'À propos', lastEdited: '1 jour' },
    { id: '3', name: 'Contact', lastEdited: '3 jours' },
  ];

  const templates = [
    { id: '1', name: 'Landing Page', category: 'Marketing', image: '/lovable-uploads/e969fdb0-661a-4e4e-ba5b-a014ae9eed59.png' },
    { id: '2', name: 'Portfolio', category: 'Professionnel' },
    { id: '3', name: 'E-commerce', category: 'Boutique' },
    { id: '4', name: 'Blog', category: 'Contenu' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-builder-blue rounded-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Page Builder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-gray-600 border-gray-200">
                Documentation
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mes projets</h1>
            <p className="text-gray-600">Gérez vos pages et créez de nouveaux projets</p>
          </div>
          <Link to="/builder">
            <Button className="mt-4 md:mt-0 bg-builder-blue hover:bg-builder-dark-blue transition-colors">
              <Plus size={18} className="mr-2" />
              Nouveau projet
            </Button>
          </Link>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12 animate-fade-in">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Projets récents</h2>
            <Button variant="link" className="text-builder-blue">
              Voir tous
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProjects.map((project) => (
              <div key={project.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-builder-light-blue rounded flex items-center justify-center text-builder-blue mr-4">
                      <Layout size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                      <p className="text-xs text-gray-500">Modifié il y a {project.lastEdited}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 h-8 w-8 p-0">
                      <Copy size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 h-8 w-8 p-0">
                      <Settings size={16} />
                    </Button>
                    <Link to="/builder">
                      <Button size="sm" className="bg-builder-light-blue text-builder-blue hover:bg-blue-100 h-8">
                        Éditer
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Modèles populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer animate-fade-in"
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {template.image ? (
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-builder-light-blue">
                    <LayoutGrid size={32} className="text-builder-blue" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-gray-500">{template.category}</span>
                <h3 className="text-sm font-medium text-gray-900 mt-1">{template.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">8 sections</span>
                  <Link to="/builder">
                    <Button size="sm" variant="outline" className="h-8 text-xs border-gray-200">
                      Utiliser
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
