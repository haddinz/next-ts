import { Product } from "../model/prodcutModel";
import { User } from "../model/userModel";
import bcrypt from 'bcryptjs'

export const Products: Product[] = [
  {
    name: "Fanta",
    slug: "fanta",
    brand: "indofood",
    image: "/../images/d1.jpg",
    category: "drink",
    price: 2,
    rating: 0,
    countInStock: 10,
    numReviews: 2,
    description: 'best drink ever y"ll see',
  },
  {
    name: "Sprite",
    slug: "sprite",
    brand: "unilever",
    image: "/../images/d2.jpg",
    category: "drink",
    price: 3,
    rating: 1,
    countInStock: 10,
    numReviews: 30,
    description: 'best drink ever y"ll see',
  },
  {
    name: "Coca-Cola",
    slug: "coca-cola",
    brand: "asiapasific",
    image: "/../images/d3.jpg",
    category: "drink",
    price: 2.5,
    rating: 4.5,
    countInStock: 10,
    numReviews: 14,
    description: 'best drink ever y"ll see',
  },
  {
    name: "Mie Sedap",
    slug: "mie-sedap",
    brand: "antartika",
    image: "/../images/f1.jpg",
    category: "food",
    price: 10,
    rating: 3,
    countInStock: 10,
    numReviews: 9,
    description: 'best food ever y"ll see',
  },
  {
    name: "Indomie",
    slug: "indomie",
    brand: "austalia",
    image: "/../images/f2.jpg",
    category: "food",
    price: 12,
    rating: 5,
    countInStock: 0,
    numReviews: 39,
    description: 'best food ever y"ll see',
  },
  {
    name: "Mie Gaga",
    slug: "mie-gaga",
    brand: "sahara",
    image: "/../images/f3.jpg",
    category: "food",
    price: 8,
    rating: 2.3,
    countInStock: 10,
    numReviews: 10,
    description: 'best food ever y"ll see',
  },
];


export const Users: User[] = [
  {
    name: 'Joe',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'Jhon',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]
