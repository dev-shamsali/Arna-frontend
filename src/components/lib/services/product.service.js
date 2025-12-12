import { products } from "../data/products";

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}
