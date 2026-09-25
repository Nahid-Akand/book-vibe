import Image from "next/image";
import Link from "next/link";
import { IBook } from "@/types/books.type";

interface IListedBooksCardProps {
  book: IBook;
}

const ListedBooksCard = ({ book }: IListedBooksCardProps) => {
  return (
    <div className="card overflow-hidden border border-slate-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Book Image */}
      <figure className="flex h-[320px] items-center justify-center bg-slate-100 p-6">
        <Image
          src={book.image}
          alt={book.bookName}
          width={220}
          height={300}
          className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Book Information */}
      <div className="card-body p-5">

        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {book.category}
          </span>

          <span className="font-semibold text-yellow-500">
            ★ {book.rating}
          </span>
        </div>

        {/* Book Name */}
        <h2 className="card-title mt-2 line-clamp-1 text-lg">
          {book.bookName}
        </h2>

        {/* Author */}
        <p className="text-sm text-slate-500">
          By {book.author}
        </p>

        {/* Details Button */}
        <div className="mt-4">
          <Link
            href={`/${book.bookId}`}
            className="btn btn-primary w-full rounded-xl"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ListedBooksCard;