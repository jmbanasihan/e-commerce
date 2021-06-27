import { useState } from "react";
import ProductItem from "../components/ProductItem";
import CartItem from "../components/CartItem";
import { debounce } from "lodash";

const Products = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [prods, setProds] = useState(data);
  const [cartItems, setCartItems] = useState([]);

  const navTogglerHandler = () => setIsOpen(!isOpen);

  const selectSortHandler = (selected) => {
    if (selected.toLowerCase() === "lowtohigh")
      setProds([...prods].sort((a, b) => Number(a.price) - Number(b.price)));
    else if (selected.toLowerCase() === "hightolow")
      setProds([...prods].sort((a, b) => Number(b.price) - Number(a.price)));
  };

  const addToCart = (newItem) => {
    const index = cartItems.findIndex((item) => item.id === newItem.id);
    if (index >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity++;
      setCartItems([...updatedCartItems]);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...newItem,
          quantity: 1,
          subtotal: function () {
            return (Number(this.price) * Number(this.quantity)).toFixed(2);
          },
        },
      ]);
    }
  };

  const addItemQuantity = (id) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity++;
      setCartItems([...updatedCartItems]);
    }
  };

  const lessItemQuantity = (id) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[index].quantity > 1) {
        updatedCartItems[index].quantity--;
        setCartItems([...updatedCartItems]);
      } else {
        const filterOut = cartItems.filter((item) => item.id !== id);
        setCartItems([...filterOut]);
      }
    }
  };

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-1 text-sm">NY</span>
            </div>
            <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
              Brand
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                onClick={navTogglerHandler}
                className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>

              <div className="flex sm:hidden">
                <button
                  onClick={navTogglerHandler}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav
            // className="isOpen ? '' : 'hidden'"
            className={`sm:flex sm:justify-center sm:items-center mt-4 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col sm:flex-row">
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Home
              </a>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Shop
              </a>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Categories
              </a>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                Contact
              </a>
              <a
                className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
                href="#"
              >
                About
              </a>
            </div>
          </nav>
          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              onChange={(e) => searchHandler(e)}
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
      <div
        //   className="cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'"
        className={`fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${
          isOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
          <button
            onClick={navTogglerHandler}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <hr className="my-3" />
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              item={item}
              addItemQuantity={addItemQuantity}
              lessItemQuantity={lessItemQuantity}
              key={item.id}
            />
          ))
        ) : (
          <h4 className="text-xl text-gray-400">Your Cart is Empty</h4>
        )}
        <div className="mt-8">
          <hr className="my-3" />
          <div className="flex my-8 justify-between">
            <h3 className="text-2xl font-medium text-gray-700">Total:</h3>
            <h3 className="text-2xl font-medium text-gray-700">
              $
              {cartItems
                .reduce(
                  (acc, curr) => acc + (curr.price * 100 * curr.quantity) / 100,
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
          <form className="flex items-center justify-center">
            <input
              className="form-input w-48"
              type="text"
              placeholder="Add promocode"
            />
            <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              <span>Apply</span>
            </button>
          </form>
        </div>
        <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
          <span>Chechout</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-700 text-2xl font-medium">
                Wrist Watch
              </h3>
              <span className="mt-3 text-sm text-gray-500">200+ Products</span>
            </div>
            <div>
              <select
                onChange={(e) => selectSortHandler(e.target.value)}
                defaultValue="DEFAULT"
              >
                {/* <option defaultValue="none" selected disabled hidden>
                Price
              </option> */}
                <option value="DEFAULT" disabled hidden>
                  Price
                </option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-ols-4 mt-6">
            {prods.map((item) => (
              <ProductItem item={item} addToCart={addToCart} key={item.id} />
            ))}
          </div>
          <div className="flex justify-center">
            <div className="flex rounded-md mt-8">
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
              >
                <span>Previous</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#"
                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
              >
                <span>Next</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-bold text-gray-500 hover:text-gray-400"
          >
            Brand
          </a>
          <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  const res = await fetch(
    `https://sheet.best/api/sheets/a132eaf2-fa34-462b-9843-ed61c7a0f08b`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
