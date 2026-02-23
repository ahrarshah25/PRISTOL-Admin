import { useState } from 'react';
import type { FC } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
        transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 w-80 lg:w-72
        shadow-2xl lg:shadow-none
      `}>
        <div className="p-8 border-b border-gray-100">
          <div className="relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              PRISTOL
            </h1>
            <p className="text-xs text-gray-500 mt-2">Admin Dashboard</p>
          </div>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative w-full flex items-center gap-4 px-6 py-4 mb-2
                  text-sm font-medium rounded-2xl
                  transition-all duration-500 overflow-hidden group
                  ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                <span className={`
                  absolute inset-0 rounded-2xl transition-all duration-500
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 scale-100 opacity-100' 
                    : 'bg-gray-100 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }
                `} />

                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className={`
                  relative z-10 transition-all duration-500
                  ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-500'}
                  ${isHovered ? 'scale-110 rotate-6' : ''}
                `}>
                  <Icon className="w-5 h-5" />
                </span>

                <span className="relative z-10 flex-1 text-left">{item.label}</span>

                {isActive && (
                  <span className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-2">PKR Currency</p>
            <p className="text-xs text-gray-500">All prices in Pakistani Rupees</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;