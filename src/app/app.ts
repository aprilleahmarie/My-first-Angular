import { Products } from './product/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Products],
  templateUrl: './app.html',  
  styleUrls: ['./app.css'] 
})
export class App {}