
import React from "react";
import { IBook } from "@/types/books.type";
import BookCard from "@/components/shared/BookCard";

type Book = {
  bookId: number;
  bookName: string;
  author: string;
  image: string;
  review: string;
  totalPages: number;
  rating: number;
  category: string;
  tags: string[];
  publisher: string;
  yearOfPublishing: number;
};

const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();
  return data;
};

const Books = async () => {
  const booksData = await getBooks();

  return (
    <section className="container mx-auto my-[70px] px-4">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Explore All Our Collection
        </p>

        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Discover Your Next{" "}
          <span className="text-indigo-600">Favorite Book</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
          Explore our collection of timeless classics, inspiring stories, and
          unforgettable books from renowned authors.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {booksData.map((book:IBook ,ind:number) => {
          return <BookCard key={ind} book={book}/>
})}
      </div>
    </section>
  );
};

export default Books;
