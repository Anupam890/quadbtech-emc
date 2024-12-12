import mongoose from 'mongoose';
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
});

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    items: [CartItemSchema],
    total: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


CartSchema.pre('save', function (next) {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.updatedAt = new Date();
    next();
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
