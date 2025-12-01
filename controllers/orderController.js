import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';
import User from '../models/User.js';

export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipcode) {
      return res.status(400).json({ message: 'Please provide complete shipping address' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');

    // Check if cart exists and has items
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const orderItems = [];

    // Build order items - FIX: use item.product.price not item.price
    cart.items.forEach((item) => {
      // Validate item structure
      if (!item || !item.product) {
        console.warn('Invalid item in cart:', item);
        return;
      }

      const price = item.product.price || 0;
      const quantity = item.quantity || 1;
      const itemTotal = price * quantity;
      
      totalPrice += itemTotal;

      orderItems.push({
        productId: item.product._id,
        name: item.product.name,
        size: item.size,
        quantity: quantity,
        price: price,
      });
    });

    // Validate that order has items
    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No valid items in cart' });
    }

    // Create the order
    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      status: 'pending',
      orderDate: new Date(),
    });

    // Send confirmation email (don't fail if email fails)
    try {
      const user = await User.findById(req.user.id);
      if (user && user.email) {
        await sendOrderConfirmationEmail(order, user);
        console.log('✅ Order confirmation email sent to:', user.email);
      }
    } catch (emailError) {
      console.error('⚠️  Email sending failed (order created successfully):', emailError.message);
      // Continue - don't fail the order if email fails
    }

    // Clear the cart after successful order
    try {
      await Cart.findByIdAndDelete(cart._id);
      console.log('✅ Cart cleared after order');
    } catch (cartError) {
      console.error('⚠️  Could not clear cart:', cartError.message);
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        _id: order._id,
        items: order.items,
        totalPrice: order.totalPrice,
        shippingAddress: order.shippingAddress,
        status: order.status,
        orderDate: order.orderDate,
      },
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to create order' 
    });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id) {
      return res.status(400).json({ message: 'Order ID required' });
    }

    const order = await Order.findById(id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the owner
    if (order.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};