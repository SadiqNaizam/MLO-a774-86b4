import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import SalesTrendWidget from '@/components/widgets/SalesTrendWidget';
import ConversionFunnelWidget from '@/components/widgets/ConversionFunnelWidget';
import TopPerformingProductsWidget from '@/components/widgets/TopPerformingProductsWidget';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ShoppingCart, AlertTriangle } from 'lucide-react';

// Placeholder data for recent activity
const recentActivities = [
  { id: 'order1', type: 'New Order', description: 'Order #12345 placed by John Doe', value: '$250.00', status: 'Processing', icon: <ShoppingCart className="h-5 w-5 text-blue-500" /> },
  { id: 'stock1', type: 'Low Stock', description: 'Product "Wireless Mouse" low in stock (5 units left)', value: '5 Units', status: 'Warning', icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
  { id: 'order2', type: 'New Order', description: 'Order #12346 placed by Jane Smith', value: '$150.75', status: 'Pending', icon: <ShoppingCart className="h-5 w-5 text-blue-500" /> },
];

const DashboardOverviewPage: React.FC = () => {
  console.log('DashboardOverviewPage loaded');
  const user = { name: 'Admin User', imageUrl: 'https://source.unsplash.com/random/100x100/?portrait' };
  const notificationCount = 3; // Example notification count

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader user={user} appName="Admin Dashboard" notificationCount={notificationCount} />
        <main className="flex-1 p-4 sm:px-6 md:p-8 overflow-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">126</div>
                <p className="text-xs text-muted-foreground">+5 since last hour</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.6%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <SalesTrendWidget title="Monthly Sales Overview"/>
            </div>
            <div className="lg:col-span-3">
              <ConversionFunnelWidget />
            </div>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Overview of new orders and important alerts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Details/Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentActivities.map((activity) => (
                                <TableRow key={activity.id}>
                                    <TableCell>{activity.icon}</TableCell>
                                    <TableCell>
                                      <Badge variant={activity.status === 'Warning' ? 'destructive' : 'secondary'}>{activity.type}</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{activity.description}</TableCell>
                                    <TableCell className="text-right">{activity.value}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <TopPerformingProductsWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;

// Minimal imports for lucide-react icons not directly used as components
import { Users, Package } from 'lucide-react';