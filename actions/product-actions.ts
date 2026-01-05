"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number",
  }),
  stock: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: "Stock must be a non-negative number",
  }),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
});

export async function createProduct(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      stock: formData.get("stock") as string,
      categoryId: formData.get("categoryId") as string,
      image: formData.get("image") as string,
    };

    // Validate with Zod
    const validatedData = productSchema.parse(rawData);

    // Create product in database
    await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
        price: parseFloat(validatedData.price),
        stock: parseInt(validatedData.stock),
        categoryId: validatedData.categoryId,
        image: validatedData.image || null,
      },
    });

    revalidatePath("/products");
    revalidatePath("/dashboard");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "Failed to create product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/products");
    revalidatePath("/dashboard");

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      stock: formData.get("stock") as string,
      categoryId: formData.get("categoryId") as string,
      image: formData.get("image") as string,
    };

    // Validate with Zod
    const validatedData = productSchema.parse(rawData);

    // Update product in database
    await prisma.product.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
        price: parseFloat(validatedData.price),
        stock: parseInt(validatedData.stock),
        categoryId: validatedData.categoryId,
        image: validatedData.image || null,
      },
    });

    revalidatePath("/products");
    revalidatePath("/dashboard");
    revalidatePath(`/products/${id}/edit`);

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "Failed to update product" };
  }
}
