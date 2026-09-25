"use client";

import React, { createContext, useState } from "react";
import { IBook } from "@/types/books.type";

type BooksContextType = {
  readBooks: IBook[];
  setReadBooks: React.Dispatch<React.SetStateAction<IBook[]>>;

  wishlist: IBook[];
  setWishlist: React.Dispatch<React.SetStateAction<IBook[]>>;
};

export const BooksContext = createContext<BooksContextType>({
  readBooks: [],
  setReadBooks: () => {},

  wishlist: [],
  setWishlist: () => {},
});

const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [readBooks, setReadBooks] = useState<IBook[]>([]);
  const [wishlist, setWishlist] = useState<IBook[]>([]);

  const shareData = {
    readBooks,
    setReadBooks,
    wishlist,
    setWishlist,
  };

  return (
    <BooksContext.Provider value={shareData}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;