import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import {
  createBookRequestSchema,
  createBookResponseSchema,
  updateBookRequestSchema,
  updateBookResponseSchema,
  deleteBookResponseSchema,
  getBookResponseSchema,
  listBooksResponseSchema,
  listBooksQuerySchema,
  searchBooksRequestSchema,
  getBooksByGenreRequestSchema,
  getBooksByAuthorRequestSchema,
  getBookByIsbnRequestSchema,
} from "./schema";

export const createBook = createRoute({
  method: "post",
  tags: ["book"],
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createBookRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Book created successfully",
      content: {
        "application/json": {
          schema: createBookResponseSchema,
        },
      },
    },
    400: {
      description: "Bad request - Invalid data",
    },
    500: {
      description: "Internal server error - Failed to create book",
    },
  },
});

export const updateBook = createRoute({
  method: "put",
  tags: ["book"],
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .transform((val) => parseInt(val, 10))
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          description: "Book ID to update",
          example: "1",
        }),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateBookRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Book updated successfully",
      content: {
        "application/json": {
          schema: updateBookResponseSchema,
        },
      },
    },
    400: {
      description: "Bad request - Invalid data",
    },
    404: {
      description: "Book not found",
    },
    500: {
      description: "Internal server error - Failed to update book",
    },
  },
});

export const deleteBook = createRoute({
  method: "delete",
  tags: ["book"],
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .transform((val) => parseInt(val, 10))
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          description: "Book ID to delete",
          example: "1",
        }),
    }),
  },
  responses: {
    200: {
      description: "Book deleted successfully",
      content: {
        "application/json": {
          schema: deleteBookResponseSchema,
        },
      },
    },
    404: {
      description: "Book not found",
    },
    500: {
      description: "Internal server error - Failed to delete book",
    },
  },
});

export const getBook = createRoute({
  method: "get",
  tags: ["book"],
  path: "/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .transform((val) => parseInt(val, 10))
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          description: "Book ID to retrieve",
          example: "1",
        }),
    }),
  },
  responses: {
    200: {
      description: "Book retrieved successfully",
      content: {
        "application/json": {
          schema: getBookResponseSchema,
        },
      },
    },
    404: {
      description: "Book not found",
    },
    500: {
      description: "Internal server error - Failed to retrieve book",
    },
  },
});

export const listBooks = createRoute({
  method: "get",
  tags: ["book"],
  path: "/",
  request: {
    query: listBooksQuerySchema,
  },
  responses: {
    200: {
      description: "Books retrieved successfully",
      content: {
        "application/json": {
          schema: listBooksResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error - Failed to retrieve books",
    },
  },
});

export const searchBooks = createRoute({
  method: "get",
  tags: ["book"],
  path: "/search",
  request: {
    query: searchBooksRequestSchema,
  },
  responses: {
    200: {
      description: "Books retrieved successfully",
      content: {
        "application/json": {
          schema: listBooksResponseSchema,
        },
      },
    },
    400: {
      description: "Bad request - Invalid search query",
    },
    500: {
      description: "Internal server error - Failed to search books",
    },
  },
});

export const getBooksByGenre = createRoute({
  method: "get",
  tags: ["book"],
  path: "/genre/{genre}",
  request: {
    params: getBooksByGenreRequestSchema,
    query: listBooksQuerySchema,
  },
  responses: {
    200: {
      description: "Books retrieved successfully",
      content: {
        "application/json": {
          schema: listBooksResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error - Failed to retrieve books",
    },
  },
});

export const getBooksByAuthor = createRoute({
  method: "get",
  tags: ["book"],
  path: "/author/{author}",
  request: {
    params: getBooksByAuthorRequestSchema,
    query: listBooksQuerySchema,
  },
  responses: {
    200: {
      description: "Books retrieved successfully",
      content: {
        "application/json": {
          schema: listBooksResponseSchema,
        },
      },
    },
    500: {
      description: "Internal server error - Failed to retrieve books",
    },
  },
});

export const getBookByIsbn = createRoute({
  method: "get",
  tags: ["book"],
  path: "/isbn/{isbn}",
  request: {
    params: getBookByIsbnRequestSchema,
  },
  responses: {
    200: {
      description: "Book retrieved successfully",
      content: {
        "application/json": {
          schema: getBookResponseSchema,
        },
      },
    },
    404: {
      description: "Book not found",
    },
    500: {
      description: "Internal server error - Failed to retrieve book",
    },
  },
});
