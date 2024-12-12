import cart from "../db/schema/cartSchema.js";
import Product from "../db/schema/products.js";

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = req.user.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await cart.findOne({ userId });

    if (!cart) {
      cart = new cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: productId,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.id;
    const cart = await cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(id));

    await cart.save();
    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export  { getCart, addItemToCart, removeItemFromCart };
