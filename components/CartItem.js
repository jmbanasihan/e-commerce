const CartItem = ({ product, addItemQuantity, lessItemQuantity }) => {
  return (
    <div className="flex">
      <img
        className="h-20 w-20 object-cover rounded"
        src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
        alt
      />
      <div className="mx-3">
        <h3 className="text-sm text-gray-600">{product.name}</h3>
        <span className="text-sm text-gray-600">{`$ ${product.price}`}</span>
        <div className="flex items-center mt-2">
          <button
            onClick={() => addItemQuantity(product.id)}
            className="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <span className="text-gray-700 mx-2">{product.qty}</span>
          <button
            onClick={() => lessItemQuantity(product.id)}
            className="text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
