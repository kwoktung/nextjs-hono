import { OpenAPIHono } from "@hono/zod-openapi";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createContext } from "@/lib/context";
import { Services } from "@/services";
import { HttpResponse } from "@/lib/response";
import {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  listBooks,
  searchBooks,
  getBooksByGenre,
  getBooksByAuthor,
  getBookByIsbn,
} from "./definition";

const bookApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return HttpResponse.error(c, {
        message: result.error.message,
        status: 400,
      });
    }
    return result;
  },
});

bookApp.openapi(createBook, async (c) => {
  const body = c.req.valid("json");

  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);
  const book = await services.book.createBook({
    title: body.title,
    author: body.author,
    isbn: body.isbn,
    description: body.description,
    publishedYear: body.publishedYear,
    genre: body.genre,
    pages: body.pages,
  });
  return HttpResponse.success(c, { id: book.id, success: true });
});

bookApp.openapi(updateBook, async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const result = await services.book.updateBook(id, body);
  if (!result) {
    return HttpResponse.notFound(c, "Book not found");
  }
  return HttpResponse.success(c, { id, success: true });
});

bookApp.openapi(deleteBook, async (c) => {
  const { id } = c.req.valid("param");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const result = await services.book.deleteBook(id);
  if (!result) {
    return HttpResponse.notFound(c, "Book not found");
  }
  return HttpResponse.success(c, { id, success: true });
});

bookApp.openapi(getBook, async (c) => {
  const { id } = c.req.valid("param");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const book = await services.book.getBookById(id);
  if (!book) {
    return HttpResponse.notFound(c, "Book not found");
  }
  return HttpResponse.success(c, { book });
});

bookApp.openapi(listBooks, async (c) => {
  const { offset, limit } = c.req.valid("query");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const books = await services.book.getBooks(limit, offset);
  const total = await services.book.getBooksCount();

  return HttpResponse.success(c, {
    books,
    total,
  });
});

bookApp.openapi(searchBooks, async (c) => {
  const { query } = c.req.valid("query");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const books = await services.book.searchBooks(query);
  return HttpResponse.success(c, {
    books,
    total: books.length,
  });
});

bookApp.openapi(getBooksByGenre, async (c) => {
  const { genre } = c.req.valid("param");
  const { offset, limit } = c.req.valid("query");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const books = await services.book.getBooksByGenre(genre, limit, offset);
  return HttpResponse.success(c, {
    books,
    total: books.length,
  });
});

bookApp.openapi(getBooksByAuthor, async (c) => {
  const { author } = c.req.valid("param");
  const { offset, limit } = c.req.valid("query");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const books = await services.book.getBooksByAuthor(author, limit, offset);
  return HttpResponse.success(c, {
    books,
    total: books.length,
  });
});

bookApp.openapi(getBookByIsbn, async (c) => {
  const { isbn } = c.req.valid("param");
  const ctx = createContext(getCloudflareContext({ async: false }).env);
  const services = new Services(ctx);

  const book = await services.book.getBookByIsbn(isbn);
  if (!book) {
    return HttpResponse.notFound(c, "Book not found");
  }
  return HttpResponse.success(c, { book });
});

export default bookApp;
