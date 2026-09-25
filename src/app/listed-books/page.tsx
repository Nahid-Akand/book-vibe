"use client";

import React, { useContext, useMemo, useState } from "react";
import { BooksContext } from "@/context/BooksContext";
import ListedBooksCard from "@/components/shared/ListedBooksCard";
import { IBook } from "@/types/books.type";
import Link from "next/link";

type SortOption = "rating" | "pages" | "year";

const ListedBooks = () => {
  const { readBooks, wishlist } = useContext(BooksContext);

  const [sortBy, setSortBy] = useState<"rating"| "pages"| "year">("rating");

  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");

  const currentBooks = activeTab === "read" ? readBooks : wishlist;

  const sortedBooks = useMemo(() => {
    return [...currentBooks].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "pages") {
        return b.totalPages - a.totalPages;
      }

      if (sortBy === "year") {
        return b.yearOfPublishing - a.yearOfPublishing;
      }

      return 0;
    });
  }, [currentBooks, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Page Header */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 px-6 py-12 text-center text-white shadow-xl sm:px-10 sm:py-16">
          <div className="mx-auto max-w-2xl">

            <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              Your Personal Library
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Listed Books
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
              Manage the books you have read and the books you want to read.
            </p>

            {/* Sort Dropdown */}
            <div className="mt-6 flex justify-center">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                className="select select-success bg-white text-slate-900"
              >
                <option value="rating">Rating</option>
                <option value="pages">Number Of Pages</option>
                <option value="year">Publisher Year</option>
              </select>
            </div>

          </div>
        </section>

        {/* Tabs */}
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">

          <div className="tabs tabs-lift w-full">

            {/* READ BOOKS TAB */}
            <input
              type="radio"
              name="book_tabs"
              className="tab"
              aria-label={`Read Books (${readBooks.length})`}
              checked={activeTab === "read"}
              onChange={() => setActiveTab("read")}
            />

            <div className="tab-content border-base-300 bg-base-100 p-4 sm:p-6">

              {sortedBooks.length > 0 && activeTab === "read" ? (
                <>
                  {/* Header */}
                  <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Read Books
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Books you have already finished reading.
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                      {readBooks.length}{" "}
                      {readBooks.length === 1 ? "Book" : "Books"}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedBooks.map((book: IBook) => (
                      <ListedBooksCard
                        key={book.bookId}
                        book={book}
                      />
                    ))}
                  </div>
                </>
              ) : activeTab === "read" ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">
                    📚
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    No Read Books Yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Start exploring books and mark a book as read to see it
                    here.
                  </p>

                  <Link
                    href="/books"
                    className="btn btn-primary mt-6 rounded-xl px-6"
                  >
                    Explore Books
                  </Link>
                </div>
              ) : null}

            </div>

            {/* WISHLIST TAB */}
            <input
              type="radio"
              name="book_tabs"
              className="tab"
              aria-label={`Wishlist (${wishlist.length})`}
              checked={activeTab === "wishlist"}
              onChange={() => setActiveTab("wishlist")}
            />

            <div className="tab-content border-base-300 bg-base-100 p-4 sm:p-6">

              {sortedBooks.length > 0 && activeTab === "wishlist" ? (
                <>
                  {/* Header */}
                  <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        Wishlist
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Books you want to read in the future.
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-pink-50 px-4 py-2 text-sm font-semibold text-pink-600">
                      {wishlist.length}{" "}
                      {wishlist.length === 1 ? "Book" : "Books"}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedBooks.map((book: IBook) => (
                      <ListedBooksCard
                        key={book.bookId}
                        book={book}
                      />
                    ))}
                  </div>
                </>
              ) : activeTab === "wishlist" ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-4xl">
                    ❤️
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Your Wishlist Is Empty
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Find books you love and add them to your wishlist.
                  </p>

                  <Link
                    href="/books"
                    className="btn btn-primary mt-6 rounded-xl px-6"
                  >
                    Explore Books
                  </Link>
                </div>
              ) : null}

            </div>

          </div>
        </section>
      </div>
    </main>
  );
};

export default ListedBooks;