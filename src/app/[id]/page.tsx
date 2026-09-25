import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

import ReadButton from "@/components/bookDetails/ReadButton";
import WishListButton from "@/components/bookDetails/WishListButton";
import type { IBook } from "@/types/books.type";

const getBook = async (id: string): Promise<IBook | undefined> => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "booksData.json"
  );

  const file = await fs.readFile(filePath, "utf-8");
  const books: IBook[] = JSON.parse(file);

  return books.find((item: IBook) => String(item.bookId) === id);
};

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="mb-8 inline-block rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Back to Books
        </Link>

        <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
          <div className="flex items-center justify-center rounded-2xl bg-slate-100 p-6">
            <img
              src={book.image}
              alt={book.bookName}
              className="max-h-[500px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-600">
                {book.category}
              </span>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                ⭐ {book.rating}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {book.bookName}
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              By {book.author}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Total Pages</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {book.totalPages}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Publisher</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {book.publisher}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Published Year</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {book.yearOfPublishing}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-slate-500">Rating</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {book.rating}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Tags
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {book.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-pink-50 px-3 py-1 text-sm text-pink-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Review
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                {book.review}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ReadButton book={book} />
              <WishListButton book={book} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;