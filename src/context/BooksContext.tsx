"use client";

import React, { createContext, useState } from "react";

type BooksContextType = {
  readBooks: number[];
  setReadBooks: React.Dispatch<React.SetStateAction<number[]>>;
  wishlist: number[];
  setWishlist: React.Dispatch<React.SetStateAction<number[]>>;
};

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [readBooks, setReadBooks] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

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