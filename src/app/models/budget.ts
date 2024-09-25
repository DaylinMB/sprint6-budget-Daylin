// models/budget.ts
export interface Ilist {
  name: string;
  phone: string;
  email: string;
  seo: boolean;
  ads: boolean;
  web: boolean;
  pagines: number;
  llenguatges: number;
  date: Date;
  total: number;
}

export interface Product {
  name: string;
  price: number;
  article: string;
}
