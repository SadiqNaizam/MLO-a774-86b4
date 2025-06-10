import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Edit, Trash2, List, Grid } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  status: 'Active' | 'Draft' | 'Archived';
}

const placeholderProducts: Product[] = [
  { id: 'PROD001', name: 'Ergonomic Keyboard', sku: 'EK-001', price: 79.99, stock: 150, category: 'Electronics', imageUrl: 'https://source.unsplash.com/random/100x100/?keyboard', status: 'Active' },
  { id: 'PROD002', name: 'Wireless Mouse', sku: 'WM-002', price: 25.50, stock: 200, category: 'Electronics', imageUrl: 'https://source.unsplash.com/random/100x100/?mouse', status: 'Active' },
  { id: 'PROD003', name: 'Organic Green Tea', sku: 'OGT-003', price: 12.00, stock: 50, category: 'Groceries', imageUrl: 'https://source.unsplash.com/random/100x100/?tea', status: 'Draft' },
  { id: 'PROD004', name: 'Yoga Mat Premium', sku: 'YMP-004', price: 45.00, stock: 0, category: 'Sports', imageUrl: 'https://source.unsplash.com/random/100x100/?yoga,mat', status: 'Archived' },
  { id: 'PROD005', name: 'Stainless Steel Water Bottle', sku: 'SSWB-005', price: 19.99, stock: 300, category: 'Home Goods', imageUrl: 'https://source.unsplash.com/random/100x100/?water,bottle', status: 'Active' },
];

const ProductCatalogPage: React.FC = () => {
  console.log('ProductCatalogPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredProducts = placeholderProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductDialogOpen(true);
  };
  
  const getStatusBadgeVariant = (status: Product['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Archived': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader user={{ name: 'Admin User' }} appName="Product Catalog" />
        <main className="flex-1 p-4 sm:px-6 md:p-8 overflow-auto">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Manage Products</h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products by name, SKU..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                {viewMode === 'list' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                <span className="sr-only">Toggle View</span>
              </Button>
              <Button onClick={() => handleEditProduct(placeholderProducts[0])}> {/* Example: Edit first product */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableCaption>A list of products in the catalog.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage src={product.imageUrl} alt={product.name} />
                            <AvatarFallback>{product.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{product.stock > 0 ? product.stock : <Badge variant="destructive">Out of Stock</Badge>}</TableCell>
                        <TableCell><Badge variant={getStatusBadgeVariant(product.status)}>{product.status}</Badge></TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                            <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold mb-1">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-1">{product.sku} | {product.category}</p>
                    <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
                    <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(product.status)} className="ml-2">{product.status}</Badge>
                  </CardContent>
                  <CardFooter className="p-4 border-t flex justify-end gap-2">
                     <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length > 10 && viewMode === 'list' && ( /* Example pagination for list view */
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

      {selectedProduct && (
        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product: {selectedProduct.name}</DialogTitle>
              <DialogDescription>Make changes to product details here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="py-4 grid gap-4">
              {/* Simplified form fields for brevity */}
              <div><label htmlFor="name" className="text-sm font-medium">Name</label><Input id="name" defaultValue={selectedProduct.name} /></div>
              <div><label htmlFor="price" className="text-sm font-medium">Price</label><Input id="price" type="number" defaultValue={selectedProduct.price} /></div>
              <div><label htmlFor="stock" className="text-sm font-medium">Stock</label><Input id="stock" type="number" defaultValue={selectedProduct.stock} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsEditProductDialogOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductCatalogPage;