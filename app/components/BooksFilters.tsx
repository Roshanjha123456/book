/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const books = [
  {
    id: 1,
    bookName: "The Catcher in the Rye",
    authorName: "J.D. Salinger",
    category: "Fiction",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    bookName: "To Kill a Mockingbird",
    authorName: "Harper Lee",
    category: "Classic",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    bookName: "1984",
    authorName: "George Orwell",
    category: "Dystopian",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    bookName: "Pride and Prejudice",
    authorName: "Jane Austen",
    category: "Romance",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    bookName: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    category: "Fantasy",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    bookName: "The Midnight Library",
    authorName: "Matt Haig",
    category: "Contemporary",
    isLatest: true,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    bookName: "The Invisible Life of Addie LaRue",
    authorName: "V.E. Schwab",
    category: "Fantasy",
    isLatest: true,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    bookName: "Where the Crawdads Sing",
    authorName: "Delia Owens",
    category: "Mystery",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    bookName: "Educated",
    authorName: "Tara Westover",
    category: "Memoir",
    isLatest: false,
    image: "https://images.unsplash.com/photo-1705721357357-ab87523248f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    bookName: "Becoming",
    authorName: "Michelle Obama",
    category: "Biography",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 11,
    bookName: "The Silent Patient",
    authorName: "Alex Michaelides",
    category: "Thriller",
    isLatest: true,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 12,
    bookName: "The Seven Husbands of Evelyn Hugo",
    authorName: "Taylor Jenkins Reid",
    category: "Historical Fiction",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 13,
    bookName: "The Song of Achilles",
    authorName: "Madeline Miller",
    category: "Fantasy",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 14,
    bookName: "Dune",
    authorName: "Frank Herbert",
    category: "Science Fiction",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 15,
    bookName: "The Vanishing Half",
    authorName: "Brit Bennett",
    category: "Historical Fiction",
    isLatest: true,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 16,
    bookName: "Atomic Habits",
    authorName: "James Clear",
    category: "Self-Help",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 17,
    bookName: "The Four Winds",
    authorName: "Kristin Hannah",
    category: "Historical Fiction",
    isLatest: true,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 18,
    bookName: "A Promised Land",
    authorName: "Barack Obama",
    category: "Memoir",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 19,
    bookName: "Project Hail Mary",
    authorName: "Andy Weir",
    category: "Science Fiction",
    isLatest: true,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 20,
    bookName: "The House in the Cerulean Sea",
    authorName: "TJ Klune",
    category: "Fantasy",
    isLatest: false,
    image: "https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
  },
];



const filters = [
  {
    id: "author",
    name: "Author",
    options: [
      { value: "J.D. Salinger", label: "J.D. Salinger", checked: false },
      { value: "Harper Lee", label: "Harper Lee", checked: false },
      { value: "George Orwell", label: "George Orwell", checked: false },
      { value: "Jane Austen", label: "Jane Austen", checked: false },
      { value: "J.R.R. Tolkien", label: "J.R.R. Tolkien", checked: false },
      { value: "Matt Haig", label: "Matt Haig", checked: false },
      { value: "V.E. Schwab", label: "V.E. Schwab", checked: false },
      { value: "Delia Owens", label: "Delia Owens", checked: false },
      { value: "Tara Westover", label: "Tara Westover", checked: false },
      { value: "Michelle Obama", label: "Michelle Obama", checked: false },
      { value: "Alex Michaelides", label: "Alex Michaelides", checked: false },
      { value: "Taylor Jenkins Reid", label: "Taylor Jenkins Reid", checked: false },
      { value: "Madeline Miller", label: "Madeline Miller", checked: false },
      { value: "Frank Herbert", label: "Frank Herbert", checked: false },
      { value: "Brit Bennett", label: "Brit Bennett", checked: false },
      { value: "James Clear", label: "James Clear", checked: false },
      { value: "Kristin Hannah", label: "Kristin Hannah", checked: false },
      { value: "Barack Obama", label: "Barack Obama", checked: false },
      { value: "Andy Weir", label: "Andy Weir", checked: false },
      { value: "TJ Klune", label: "TJ Klune", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Fiction", label: "Fiction", checked: false },
      { value: "Classic", label: "Classic", checked: false },
      { value: "Dystopian", label: "Dystopian", checked: false },
      { value: "Romance", label: "Romance", checked: false },
      { value: "Fantasy", label: "Fantasy", checked: false },
      { value: "Contemporary", label: "Contemporary", checked: false },
      { value: "Mystery", label: "Mystery", checked: false },
      { value: "Memoir", label: "Memoir", checked: false },
      { value: "Biography", label: "Biography", checked: false },
      { value: "Thriller", label: "Thriller", checked: false },
      { value: "Historical Fiction", label: "Historical Fiction", checked: false },
      { value: "Science Fiction", label: "Science Fiction", checked: false },
      { value: "Self-Help", label: "Self-Help", checked: false },
    ],
  },
  {
    id: "book",
    name: "Books",
    options: [
      { value: "isLatest", label: "Latest", checked: false },
     
    ],
  }
];
 



export default function BooksFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterBooks] = useState(filters)
  const [bookData] = useState(books)


   const [selectedFilters, setSelectedFilters] = useState({
    author: [],
    category: [],
    latestBooks:[]
  });

  const [searchItem , setSearchItem] = useState("")
  // const handleChange = useCallback((e: { target: { name: any; value: any; checked: any; }; }) => {
  //   const { name, value, checked } = e.target;
  //   setSelectedFilters((prevFilters) => {
  //     const filterType = name.split("[]")[0];

  //     console.log(filterType , ")))))))")

  //     // Handle exclusive selection for "Latest" and "All Books"
  //     if (filterType === "book") {
  //       return {
  //         ...prevFilters,
  //         latestBooks: checked ? [value] : [], // Only allow one value at a time for "book" filter
  //       };
  //     }

  //     const updatedFilters = checked
  //       ? [...prevFilters[filterType], value] // Add selected value
  //       : prevFilters[filterType].filter((item: any) => item !== value); // Remove unselected value

  //     return { ...prevFilters, [filterType]: updatedFilters };
  //   });
  // }, []);

 
console.log(selectedFilters , )

  // const filteredBooks = useMemo(() => {
  //   return bookData.filter((book) => {
  //     const authorMatch =
  //       selectedFilters.author.length === 0 ||
  //       selectedFilters.author.includes(book.authorName);

  //     const categoryMatch =
  //       selectedFilters.category.length === 0 ||
  //       selectedFilters.category.includes(book.category);

  //       // const isLatestMatch = bookData.filter()
  //       // console.log(isLatestMatch , "ooooooooooooooooooooooo")

  //       // const isLatestMatch =
  //       // selectedFilters.books.length === 0 ||
  //       // (selectedFilters.books.includes("isLatest") && book.isLatest);

  //     const bookNameMatch = book.bookName.toLowerCase().includes(searchItem); 

    

  //     return authorMatch && categoryMatch  && bookNameMatch
  //   });
  // }, [bookData, selectedFilters]);



  // const handleSearchChange = useCallback((e) => {
  //   setSearchItem(e.target.value.toLowerCase());
  // }, []);

  // const handleLatest = (e) => {
  //   console.log(e.target.value , e.target.current)

  // }

   
  return (
    <div className="bg-[#121212]">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-dark bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-white-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filterBooks.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-white-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-white-400 hover:text-white-500">
                        <span className="font-medium text-white-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-white-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-white-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-white-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-white-900">
              Books
            </h1>

            <div className="flex items-center">
              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-white-700 hover:text-white-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white-400 group-hover:text-white-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-black shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                 
                </MenuItems>
              </Menu> */}
{/* 
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button> */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between  py-3 text-sm text-white-400 hover:text-gray-500">
                        <span className="font-medium text-white-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              // onChange={handleChange}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-white-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
           
              <div className="lg:col-span-3">
              <div>
              {/* <input className="bg-white text-black"  onChange={handleSearchChange}/> */}
            </div>
                <div className="">
                  <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {books.map((book) => (
                        <div key={book.id} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              alt={""}
                              src={book.image}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                            <p className="mt-1 text-sm text-white-500">
                                Author Name
                              </p>                            
                              <p className="mt-1 text-sm text-white-500">
                               Category
                              </p>
                            </div>

                            <div>
                            <p className="mt-1 text-sm text-gray-500">
                                {book.authorName}
                              </p>
                               
                              <p className="mt-1 text-sm text-gray-500">
                                {book.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
