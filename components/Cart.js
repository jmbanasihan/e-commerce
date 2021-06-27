const Cart = (props) => {
  const { cartItems, onAdd, onRemove } = props;
  return (
    <>
      <div>
        {cartItems.length === 0 && (
          <div className="text-gray-400 mb-10">Your cart is empty.</div>
        )}
      </div>
    </>
  );
};

export default Cart;
