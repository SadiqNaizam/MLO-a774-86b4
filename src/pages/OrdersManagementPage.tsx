import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Eye } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { productId: string; productName: string; quantity: number; price: number }[];
}

const placeholderOrders: Order[] = [
  { id: 'ORD001', customerName: 'Alice Wonderland', date: '2024-07-20', status: 'Delivered', total: 150.00, items: [{ productId: 'P001', productName: 'Mad Hatter Tea Set', quantity: 1, price: 150.00 }] },
  { id: 'ORD002', customerName: 'Bob The Builder', date: '2024-07-21', status: 'Shipped', total: 75.50, items: [{ productId: 'P002', productName: 'Tool Belt', quantity: 1, price: 75.50 }] },
  { id: 'ORD003', customerName: 'Charlie Brown', date: '2024-07-22', status: 'Processing', total: 25.00, items: [{ productId: 'P003', productName: 'Kite', quantity: 1, price: 25.00 }] },
  { id: 'ORD004', customerName: 'Diana Prince', date: '2024-07-22', status: 'Pending', total: 300.00, items: [{ productId: 'P004', productName: 'Lasso of Truth Replica', quantity: 1, price: 300.00 }] },
  { id: 'ORD005', customerName: 'Edward Scissorhands', date: '2024-07-23', status: 'Cancelled', total: 50.00, items: [{ productId: 'P005', productName: 'Hedge Trimmer', quantity: 1, price: 50.00 }] },
];

const OrdersManagementPage: React.FC = () => {
  console.log('OrdersManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);

  const filteredOrders = placeholderOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
  };
  
  const getStatusBadgeVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'default'; // Green (assuming default is themed appropriately)
      case 'Shipped': return 'secondary'; // Blue-ish
      case 'Processing': return 'outline'; // Yellow-ish (using outline as a stand-in)
      case 'Pending': return 'destructive'; // Orange-ish/Red-ish (using destructive as stand-in for pending urgency)
      case 'Cancelled': return 'secondary'; // Grey
      default: return 'outline';
    }
  };


  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader user={{ name: 'Admin User' }} appName="Order Management" />
        <main className="flex-1 p-4 sm:px-6 md:p-8 overflow-auto">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Manage Orders</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders by ID or customer..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Order (Not Implemented)
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableCaption>A list of recent customer orders.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Order</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredOrders.length > 5 && ( /* Show pagination if more than 5 items for example */
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>

      {selectedOrder && (
        <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customerName} | Date: {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <p><strong>Status:</strong> <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
              <p><strong>Total Amount:</strong> ${selectedOrder.total.toFixed(2)}</p>
              <h4 className="font-semibold mt-2">Items:</h4>
              <ul className="list-disc list-inside text-sm">
                {selectedOrder.items.map(item => (
                  <li key={item.productId}>{item.productName} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                ))}
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOrderDialogOpen(false)}>Close</Button>
              <Button>Update Status (Not Implemented)</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersManagementPage;

import { Card, CardContent } from '@/components/ui/card'; // Already there, added for clarity during thought process