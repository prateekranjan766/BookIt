import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    author: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    mrp: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    }, //in percent
    image: {
      type: String,
      required: true,
      default: '/images/SAMPLE-LOGO.jpg',
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    language: {
      type: String,
      required: true,
    },
    dimensions: {
      length: {
        type: Number,
        required: true,
        default: 0,
      },
      breadth: {
        type: Number,
        required: true,
        default: 0,
      },
      height: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    numOfPages: {
      type: Number,
      required: true,
      default: 0,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    }, //in grams
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
