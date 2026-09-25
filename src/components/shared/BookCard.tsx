import React from 'react';
import Image from 'next/image';
import { IBook } from '@/types/books.type';
import Link from 'next/link';

interface IBookCardProps{
    book: IBook;
}

const BookCard = ({book}: IBookCardProps) => {
    return (
         <article
                 
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative h-[280px] overflow-hidden bg-slate-100">
                      <Image
                        src={book.image}
                        alt={book.bookName}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
        
                      {/* Category Badge */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur-sm">
                          {book.category}
                        </span>
                      </div>
        
                      {/* Rating */}
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm">
                        <span className="text-yellow-500">★</span>
                        {book.rating}
                      </div>
                    </div>
        
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                        {book.bookName}
                      </h3>
        
                      <p className="mt-1 text-sm text-slate-500">
                        by{" "}
                        <span className="font-medium text-slate-700">
                          {book.author}
                        </span>
                      </p>
        
                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
        
                      {/* Book Information */}
                      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                        <div>
                          <p className="text-xs text-slate-400">Pages</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {book.totalPages}
                          </p>
                        </div>
        
                        <div>
                          <p className="text-xs text-slate-400">Published</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {book.yearOfPublishing}
                          </p>
                        </div>
        
                        <div>
                          <p className="text-xs text-slate-400">Publisher</p>
                          <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                            {book.publisher}
                          </p>
                        </div>
        
                        <div>
                          <p className="text-xs text-slate-400">Category</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {book.category}
                          </p>
                        </div>
                      </div>
        
                      {/* Button */}
                     <Link href={`/${book.bookId}`}> <button className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg">
                        View Details
                      </button></Link>
                    </div>
                  </article>
    );
};

export default BookCard;