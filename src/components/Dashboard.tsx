import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { useGetCryptoDataQuery } from '../store/cryptoApi';
import { RootState } from '../store/store';
import { setLayouts, removeComponent } from '../store/layoutSlice';
import { toggleTheme } from '../store/themeSlice';
import Table from './Table';
import Graph from './Graph';
import SummaryCard from './SummaryCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetCryptoDataQuery();
  const layouts = useSelector((state: RootState) => state.layout.layouts);
  const components = useSelector((state: RootState) => state.layout.components);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
      dispatch(setLayouts(JSON.parse(savedLayout)));
    }
  }, [dispatch]);

  const onLayoutChange = (layout: Layout[], layouts: { [key: string]: Layout[] }) => {
    dispatch(setLayouts(layouts));
    localStorage.setItem('dashboardLayout', JSON.stringify(layouts));
  };

  const handleRemoveComponent = (componentId: string) => {
    dispatch(removeComponent(componentId));
  };

  const handleExportConfig = () => {
    const config = {
      layouts,
      components,
      isDarkMode,
    };
    const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-config.json';
    a.click();
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const config = JSON.parse(e.target?.result as string);
        dispatch(setLayouts(config.layouts));
        dispatch(toggleTheme(config.isDarkMode));
      };
      reader.readAsText(file);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen">Error: {JSON.stringify(error)}</div>;

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
          <div className="space-x-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Toggle Theme
            </button>
            <button
              onClick={handleExportConfig}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Export Config
            </button>
            <label className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors cursor-pointer">
              Import Config
              <input type="file" onChange={handleImportConfig} accept=".json" className="hidden" />
            </label>
          </div>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          onLayoutChange={onLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={120}
        >
          {components.map((componentId) => (
            <div key={componentId} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{componentId.charAt(0).toUpperCase() + componentId.slice(1)}</h2>
                <button
                  onClick={() => handleRemoveComponent(componentId)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
              {componentId === 'table' && <Table data={data || []} />}
              {componentId === 'graph' && <Graph data={data || []} />}
              {componentId === 'summary' && <SummaryCard data={data || []} />}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default Dashboard;

