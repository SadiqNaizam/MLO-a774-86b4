import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming utils.ts for cn function
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, ShoppingCart, Package, Users, BarChart2, Settings } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/settings', label: 'Settings', icon: Settings }, // Example
];

const AppSidebar: React.FC = () => {
  console.log("Rendering AppSidebar");
  const location = useLocation();

  return (
    <aside className="bg-background border-r h-screen sticky top-0 w-64 flex-col hidden md:flex">
      <div className="p-4 border-b">
        {/* Placeholder for a logo or app name, could also be in header */}
        <Link to="/" className="text-xl font-semibold">
          My App
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        {/* Sidebar footer content, e.g., user profile quick view or collapse button */}
        <p className="text-xs text-muted-foreground">© 2024 Ascendion</p>
      </div>
    </aside>
  );
};

export default AppSidebar;