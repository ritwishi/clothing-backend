import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * Add item to user's cart.
 * Expects: { productId, size, quantity }
 */
export const addToCart = async (req, res) => {
  try {
    // Ensure user is present
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { productId, size, quantity } = req.body;

    if (!productId || !size || quantity == null) {
      return res.status(400).json({ message: 'Please provide productId, size and quantity' });
    }

    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Defensive: ensure product.sizes exists and is array
    if (!Array.isArray(product.sizes) || !product.sizes.includes(size)) {
      return res.status(400).json({ message: 'Size not available for this product' });
    }

    let cart = await Cart.findOne({ userId });

    const itemToAdd = {
      product: productId,
      size,
      quantity: qty,
      price: product.price,
    };

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [itemToAdd],
      });
    } else {
      const existingItem = cart.items.find(
        (it) => it.product.toString() === productId && it.size === size
      );

      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity || 0) + qty;
      } else {
        cart.items.push(itemToAdd);
      }
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    console.error('addToCart error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get current user's cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    let cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart) {
      // Return a consistent shape even when cart is empty
      cart = { userId, items: [] };
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error('getCart error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a cart item quantity.
 * Expects: { productId, size, quantity }
 */
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { productId, size, quantity } = req.body;
    if (!productId || !size || quantity == null) {
      return res.status(400).json({ message: 'Please provide productId, size and quantity' });
    }

    const qty = Number(quantity);
    if (Number.isNaN(qty)) {
      return res.status(400).json({ message: 'Quantity must be a number' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      (it) => it.product.toString() === productId && it.size === size
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter(
        (it) => !(it.product.toString() === productId && it.size === size)
      );
    } else {
      item.quantity = qty;
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart,
    });
  } catch (error) {
    console.error('updateCartItem error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove a single item from cart.
 * Expects { productId, size } in body (DELETE with body supported by axios)
 */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const { productId, size } = req.body;
    if (!productId || !size) {
      return res.status(400).json({ message: 'Please provide productId and size' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (it) => !(it.product.toString() === productId && it.size === size)
    );

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    console.error('removeFromCart error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Clear all items in cart
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authenticated' });

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    console.error('clearCart error:', error);
    res.status(500).json({ message: error.message });
  }
};
