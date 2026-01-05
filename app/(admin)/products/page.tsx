import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteButton } from "./delete-button";
import { Plus, Package as PackageIcon } from "lucide-react";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient-purple mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory efficiently</p>
        </div>
        <Link href="/products/new">
          <Button className="gradient-purple text-white shadow-premium hover:shadow-premium-lg transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Create New Product
          </Button>
        </Link>
      </div>

      {/* Products Card */}
      <Card className="border-0 shadow-premium bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gradient-purple">All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-20 w-20 rounded-full gradient-purple flex items-center justify-center mb-4">
                <PackageIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first product</p>
              <Link href="/products/new">
                <Button className="gradient-purple text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-4 py-4 text-left test-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-purple-50/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        {product.description && (
                          <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {product.description}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-full gradient-blue text-white px-3 py-1 text-xs font-semibold shadow-sm">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-lg text-gradient-purple">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                            product.stock > 10
                              ? "bg-emerald-100 text-emerald-800"
                              : product.stock > 0
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <DeleteButton productId={product.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
