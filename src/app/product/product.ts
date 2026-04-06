import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  price: number;
  image: string;
  type: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './product.html',   
  styleUrls: ['./product.css'],   
})
export class Products {

  products: Product[] = [
    { name: 'Solo Leveling', price: 799, image: '', type: 'Action Fantasy', stock: 12 },
    { name: 'The Beginning After The End', price: 699, image: '', type: 'Reincarnation Fantasy', stock: 8 },
    { name: 'Omniscient Reader', price: 750, image: '', type: 'Apocalypse Fantasy', stock: 10 },
    { name: 'Tower of God', price: 720, image: '', type: 'Adventure', stock: 15 },
    { name: 'Attack on Titan', price: 950, image: '', type: 'Dark Fantasy', stock: 3 },
    { name: 'Demon Slayer', price: 880, image: '', type: 'Action', stock: 6 },
    { name: 'Eleceed', price: 730, image: '', type: 'Superpower', stock: 9 },
    { name: 'Lookism', price: 690, image: '', type: 'Drama', stock: 11 },
    { name: 'Hardcore Leveling Warrior', price: 760, image: '', type: 'Game Fantasy', stock: 7 },
    { name: 'Noblesse', price: 820, image: '', type: 'Supernatural', stock: 5 }
  ];

  cart: CartItem[] = [];
  totalPay: number = 0;

  addToCart(product: Product) {
    if (product.stock <= 0) return;

    const item = this.cart.find(p => p.name === product.name);

    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    product.stock--;
    this.calculateTotal();
  }

  removeFromCart(product: CartItem) {
    const item = this.cart.find(p => p.name === product.name);
    if (!item) return;

    item.quantity--;

    const originalProduct = this.products.find(p => p.name === product.name);
    if (originalProduct) {
      originalProduct.stock++;
    }

    if (item.quantity <= 0) {
      this.cart = this.cart.filter(p => p.name !== product.name);
    }

    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPay = this.cart.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
  }

  get totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cart.forEach(item => {
      const originalProduct = this.products.find(p => p.name === item.name);
      if (originalProduct) {
        originalProduct.stock += item.quantity;
      }
    });
    this.cart = [];
    this.totalPay = 0;
  }
}