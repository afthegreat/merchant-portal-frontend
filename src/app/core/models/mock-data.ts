export interface ItemVariant {
  id: number;
  unitPrice: number;
  color: string;
  model: string;
  stock: number;
}

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  unitOfMeasurement: string;
  variants: ItemVariant[];
}

export interface Subcategory {
  id: number;
  name: string;
  items: Item[];
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface BusinessType {
  id: number;
  name: string;
  categories: Category[];
}

export const MOCK_BUSINESS_TYPES: BusinessType[] = [
  {
    id: 1,
    name: 'Retail Electronics',
    categories: [
      {
        id: 101,
        name: 'Computers',
        subcategories: [
          {
            id: 1001,
            name: 'Laptops',
            items: [
              {
                id: 10001,
                name: 'ThinkPad X1 Carbon',
                imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&q=80',
                unitOfMeasurement: 'Pieces',
                variants: [
                  { id: 1, unitPrice: 1200, color: 'Black', model: 'Gen 9 (2021)', stock: 50 },
                  { id: 2, unitPrice: 1500, color: 'Silver', model: 'Gen 10 (2022)', stock: 20 }
                ]
              },
              {
                id: 10002,
                name: 'MacBook Pro 16"',
                imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80',
                unitOfMeasurement: 'Pieces',
                variants: [
                  { id: 3, unitPrice: 2499, color: 'Space Gray', model: 'M2 Max', stock: 15 },
                  { id: 4, unitPrice: 2499, color: 'Silver', model: 'M2 Max', stock: 5 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 102,
        name: 'Mobile Devices',
        subcategories: [
          {
            id: 1002,
            name: 'Smartphones',
            items: [
              {
                id: 10003,
                name: 'iPhone 15 Pro',
                imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=300&q=80',
                unitOfMeasurement: 'Pieces',
                variants: [
                  { id: 5, unitPrice: 999, color: 'Natural Titanium', model: '128GB', stock: 100 },
                  { id: 6, unitPrice: 1099, color: 'Blue Titanium', model: '256GB', stock: 45 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Apparel & Fashion',
    categories: [
      {
        id: 201,
        name: 'Men\'s Wear',
        subcategories: [
          {
            id: 2001,
            name: 'Footwear',
            items: [
              {
                id: 20001,
                name: 'Running Sneakers',
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
                unitOfMeasurement: 'Pairs',
                variants: [
                  { id: 7, unitPrice: 120, color: 'Red/Black', model: 'ZoomX', stock: 30 },
                  { id: 8, unitPrice: 110, color: 'White', model: 'Pegasus 39', stock: 60 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
