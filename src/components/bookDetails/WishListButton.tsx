"use client";

import { BooksContext } from "@/context/BooksContext";
import { IBook } from "@/types/books.type";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const WishListButton = ({ book }: { book: IBook }) => {
  const { wishlist, setWishlist } = useContext(BooksContext);

  const handleAddToWishList = () => {
    setWishlist([...wishlist, book]);
    toast.success(`you have read "${book.bookName}"`)
  };

  return (
    <button
      className="btn btn-primary rounded-xl px-8 shadow-md hover:shadow-lg"
      onClick={handleAddToWishList}
    >
      Add to Wishlist
    </button>
  );
};

export default WishListButton;