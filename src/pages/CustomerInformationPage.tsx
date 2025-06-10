import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, Eye, Edit } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  avatarUrl: string;
  lastActivity: string;
}

const placeholderCustomers: Customer[] = [
  { id: 'CUST001', name: 'Alice Wonderland', email: 'alice@example.com', joinDate: '2023-01-15', totalOrders: 5, totalSpent: 750.00, avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,portrait', lastActivity: 'Viewed Product X' },
  { id: 'CUST002', name: 'Bob The Builder', email: 'bob@example.com', joinDate: '2023-03-22', totalOrders: 12, totalSpent: 1230.50, avatarUrl: 'https://source.unsplash.com/random/100x100/?man,portrait', lastActivity: 'Placed Order #ORD123' },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2023-05-10', totalOrders: 2, totalSpent: 99.00, avatarUrl: 'https://source.unsplash.com/random/100x100/?boy,portrait', lastActivity: 'Added to Cart' },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', joinDate: '2022-11-01', totalOrders: 25, totalSpent: 5600.75, avatarUrl: 'https://source.unsplash.com/random/100x100/?woman,strong', lastActivity: 'Updated Profile' },
  { id: 'CUST005', name: 'Edward Scissorhands', email: 'edward@example.com', joinDate: '2024-02-28', totalOrders: 1, totalSpent: 45.00, avatarUrl: 'https://source.unsplash.com/random/100x100/?man,artistic', lastActivity: 'Browsed Category Y' },
];

const CustomerInformationPage: React.FC = () => {
  console.log('CustomerInformationPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewCustomerDialogOpen, setIsViewCustomerDialogOpen] = useState(false);

  const filteredCustomers = placeholderCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewCustomerDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader user={{ name: 'Admin User' }} appName="Customer Information" />
        <main className="flex-1 p-4 sm:px-6 md:p-8 overflow-auto">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Manage Customers</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers by name or email..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" /> Add Customer (Not Implemented)
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableCaption>A list of registered customers.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell className="text-right">{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer)}>
                          <Eye className="h-4 w-4" /> <span className="sr-only">View Profile</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(customer)}> {/* Re-use view for edit simplicity */}
                          <Edit className="h-4 w-4" /> <span className="sr-only">Edit Profile</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredCustomers.length > 10 && ( /* Example pagination */
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>

      {selectedCustomer && (
        <Dialog open={isViewCustomerDialogOpen} onOpenChange={setIsViewCustomerDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Customer Profile: {selectedCustomer.name}</DialogTitle>
              <DialogDescription>
                {selectedCustomer.email} | Joined: {selectedCustomer.joinDate}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                    <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p>
                  </div>
              </div>
              <p><strong>Last Activity:</strong> {selectedCustomer.lastActivity}</p>
              {/* More customer details can be added here */}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewCustomerDialogOpen(false)}>Close</Button>
              <Button>Edit Profile (Not Implemented)</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomerInformationPage;