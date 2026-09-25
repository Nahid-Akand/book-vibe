import ReadButton from "@/components/bookDetails/ReadButton";
import WishListButton from "@/components/bookDetails/WishListButton";
import { IBook } from "@/types/books.type";
import Image from "next/image";

interface IBookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getBooks = async (): Promise<IBook[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
};

const BookDetailsPage = async ({
  params,
}: IBookDetailsPageProps) => {
  const { id } = await params;

  const booksData = await getBooks();

  const book = booksData.find(
    (item) => String(item.bookId) === String(id)
  );

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Book Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          Sorry, we could not find this book.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16">
      <div className="card lg:card-side overflow-hidden border border-slate-200 bg-base-100 shadow-xl">

        {/* Image */}
        <figure className="flex min-h-[550px] items-center justify-center bg-slate-100 p-8 sm:p-10 lg:min-h-[650px] lg:w-[45%]">
          <div className="relative h-[500px] w-[340px] overflow-hidden rounded-2xl bg-white shadow-xl sm:h-[560px] sm:w-[380px] lg:h-[600px] lg:w-[410px]">
            <Image
              src={book.image}
              alt={book.bookName}
              fill
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 410px"
              className="object-contain p-3 transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </figure>

        {/* Details */}
        <div className="card-body justify-center p-6 sm:p-8 lg:w-[55%] lg:p-10">

          {/* Category + Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600">
              {book.category}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-1.5 text-sm font-semibold text-yellow-600">
              <span>★</span>
              {book.rating}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {book.bookName}
          </h1>

          {/* Author */}
          <p className="mt-2 text-lg text-slate-500">
            Written by{" "}
            <span className="font-semibold text-slate-800">
              {book.author}
            </span>
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Review */}
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              About This Book
            </h2>

            <p className="text-sm leading-7 text-slate-500 md:text-base">
              {book.review}
            </p>
          </div>

          {/* Information */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-slate-200 py-5 sm:grid-cols-4">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Pages
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                {book.totalPages}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Published
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                {book.yearOfPublishing}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Publisher
              </p>

              <p className="mt-1 truncate text-lg font-bold text-slate-800">
                {book.publisher}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Rating
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                {book.rating}/5
              </p>
            </div>

          </div>

          {/* Button */}
          <div className="card-actions mt-6 justify-end">
            <ReadButton book={book}/>
            <WishListButton book={book}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;