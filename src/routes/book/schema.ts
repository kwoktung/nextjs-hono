import { z } from "zod";

export const createBookRequestSchema = z.object({
  title: z.string().min(1).openapi({
    description: "The title of the book",
    example: "The Great Gatsby",
  }),
  author: z.string().min(1).openapi({
    description: "The author of the book",
    example: "F. Scott Fitzgerald",
  }),
  isbn: z.string().optional().openapi({
    description: "The ISBN of the book",
    example: "978-0743273565",
  }),
  description: z.string().optional().openapi({
    description: "The description of the book",
    example:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  }),
  publishedYear: z
    .number()
    .min(1800)
    .max(new Date().getFullYear())
    .optional()
    .openapi({
      description: "The year the book was published",
      example: 1925,
    }),
  genre: z.string().optional().openapi({
    description: "The genre of the book",
    example: "Fiction",
  }),
  pages: z.number().min(1).optional().openapi({
    description: "The number of pages in the book",
    example: 180,
  }),
});

export const updateBookRequestSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  isbn: z.string().optional(),
  description: z.string().optional(),
  publishedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  genre: z.string().optional(),
  pages: z.number().min(1).optional(),
});

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string().nullable(),
  description: z.string().nullable(),
  publishedYear: z.number().nullable(),
  genre: z.string().nullable(),
  pages: z.number().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export const createBookResponseSchema = z.object({
  id: z.number(),
  success: z.boolean(),
});

export const updateBookResponseSchema = z.object({
  id: z.number(),
  success: z.boolean(),
});

export const deleteBookResponseSchema = z.object({
  id: z.number(),
  success: z.boolean(),
});

export const listBooksResponseSchema = z.object({
  books: z.array(bookSchema),
  total: z.number(),
});

export const getBookResponseSchema = z.object({
  book: bookSchema,
});

export const searchBooksRequestSchema = z.object({
  query: z.string().min(1).openapi({
    description: "Search query for book title",
    example: "gatsby",
  }),
});

export const getBooksByGenreRequestSchema = z.object({
  genre: z.string().min(1).openapi({
    description: "Genre to filter books by",
    example: "Fiction",
  }),
});

export const getBooksByAuthorRequestSchema = z.object({
  author: z.string().min(1).openapi({
    description: "Author to filter books by",
    example: "F. Scott Fitzgerald",
  }),
});

export const getBookByIsbnRequestSchema = z.object({
  isbn: z.string().min(1).openapi({
    description: "ISBN to find book by",
    example: "978-0743273565",
  }),
});

export const listBooksQuerySchema = z.object({
  offset: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default("0"),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional()
    .default("10"),
});
