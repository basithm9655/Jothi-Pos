// =============================================
// JOTHI POS - Product Data File
// All product details and image URLs are here
// =============================================

const PRODUCTS = [
  {
    id: 1,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "Wireless Bluetooth Thermal Printer",
    subtitle: "58mm | 2 Inch",
    price: 3500,
    originalPrice: null,
    discount: null,
    description: "205 Grams, Small Portable Size Easy to carry around. Pocket Friendly for bill printing in POS systems, Spot printing, for Billing, Ticket and Receipt printing. Auto Bluetooth Pairing, for hassle free operation.",
    specs: {
      "Connectivity": "Bluetooth",
      "Paper Width": "58mm / 2 inch",
      "Weight": "205 Grams",
      "Maintenance": "Zero — No ribbon, no ink cartridge"
    },
    images: [
      "https://niyamatech.in/images/printer%201.png"
    ],
    badge: "BESTSELLER",
    badgeColor: "#D4AF37"
  },
  {
    id: 2,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "Wireless Bluetooth Thermal Printer",
    subtitle: "80mm | 3 Inch",
    price: 5500,
    originalPrice: 15000,
    discount: 63,
    description: "400 Grams, No ribbon, no ink cartridge. Printer Head with Life cycle upto 50 Kms. Perfect product to be used in Supermarkets, Retail stores, Restaurants, etc. Auto Bluetooth Pairing, for hassle free operation.",
    specs: {
      "Connectivity": "Bluetooth",
      "Paper Width": "80mm / 3 inch",
      "Weight": "400 Grams",
      "Maintenance": "Zero — No ribbon, no ink cartridge",
      "Head Life": "Up to 50 Km"
    },
    images: [
      "https://niyamatech.in/images/printer2.jpeg"
    ],
    badge: "HOT DEAL",
    badgeColor: "#e74c3c"
  },
  {
    id: 3,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "ME58 Bluetooth Thermal Label + Receipt Printer",
    subtitle: "2 Inch | 58mm",
    price: 2900,
    originalPrice: 6999,
    discount: 59,
    description: "Thermal Receipt Printer. Quality printing and low cost, Low noise and high-speed printing. Zero Maintenance — No ribbon, no ink cartridge. Color: Black, Size: 58mm.",
    specs: {
      "Connectivity": "Bluetooth",
      "Paper Width": "58mm",
      "Color": "Black",
      "Maintenance": "Zero — No ribbon, no ink cartridge"
    },
    images: [
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582-300x300.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.10.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.11.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.12.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.87.png"
    ],
    badge: "59% OFF",
    badgeColor: "#e74c3c"
  },
  {
    id: 4,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "M582 Bluetooth Thermal Receipt Printer",
    subtitle: "2 Inch | 58mm",
    price: 2399,
    originalPrice: 6999,
    discount: 66,
    description: "Thermal Receipt Printer. Quality printing and low cost, Low noise and high-speed printing. Zero Maintenance — No ribbon, no ink cartridge. Color: Black, Size: 58mm.",
    specs: {
      "Connectivity": "Bluetooth",
      "Paper Width": "58mm",
      "Color": "Black",
      "Maintenance": "Zero — No ribbon, no ink cartridge"
    },
    images: [
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.10.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.11.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.12.png",
      "https://www.f2ctechnology.com/wp-content/uploads/2022/11/M582.87.png"
    ],
    badge: "66% OFF",
    badgeColor: "#e74c3c"
  },
  {
    id: 5,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "H58 Desktop & Bluetooth Thermal Receipt Printer",
    subtitle: "2 Inch | 58mm",
    price: 1999,
    originalPrice: 2599,
    discount: 23,
    description: "Thermal Receipt Printer. Quality printing and low cost, Low noise and high-speed printing. Zero Maintenance — No ribbon, no ink cartridge. Colour: Black, Size: 58mm.",
    specs: {
      "Connectivity": "Bluetooth + USB",
      "Paper Width": "58mm",
      "Color": "Black",
      "Maintenance": "Zero — No ribbon, no ink cartridge"
    },
    images: [
      "https://www.f2ctechnology.com/wp-content/uploads/2021/04/h58.jpg"
    ],
    badge: "NEW",
    badgeColor: "#2ecc71"
  },
  {
    id: 6,
    category: "thermal-printer",
    categoryLabel: "Thermal Printer",
    name: "CX588 Bluetooth Thermal Receipt Printer",
    subtitle: "2 Inch | 58mm",
    price: 1799,
    originalPrice: 6999,
    discount: 74,
    description: "Thermal Receipt Printer. Quality printing and low cost, Low noise and high-speed printing. Zero Maintenance — No ribbon, no ink cartridge. Color: Black, Size: 58mm.",
    specs: {
      "Connectivity": "Bluetooth",
      "Paper Width": "58mm",
      "Color": "Black",
      "Maintenance": "Zero — No ribbon, no ink cartridge"
    },
    images: [
      "https://www.f2ctechnology.com/wp-content/uploads/2021/08/588.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2021/04/61kxS22jLGS._SL1500_.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2021/04/71lzhpe1e8S._SL1500_.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2021/04/71oNEqs-0S._SL1500_.jpg",
      "https://www.f2ctechnology.com/wp-content/uploads/2021/04/71ynX9SGcS._SL1500_.jpg"
    ],
    badge: "74% OFF",
    badgeColor: "#e74c3c"
  },
  {
    id: 7,
    category: "paper-rolls",
    categoryLabel: "Paper Rolls",
    name: "Thermal Paper Rolls — 2 Inch",
    subtitle: "Set of 25 Rolls / 12 Meter Each",
    price: null,
    originalPrice: null,
    discount: null,
    description: "Receipt type thermal paper rolls. Suitable for 2 inch thermal printers. 58mm/2 inch width, 12 meters length per roll. Set of 25 rolls. Black ink.",
    specs: {
      "Type": "Receipt",
      "Width": "58mm / 2 inch",
      "Length": "12 Meters/roll",
      "Quantity": "25 rolls",
      "Ink": "Black"
    },
    images: [
      "https://posbox.in/wp-content/uploads/2025/02/1.jpg",
      "https://posbox.in/wp-content/uploads/2025/02/2.jpg",
      "https://posbox.in/wp-content/uploads/2025/02/3.jpg",
      "https://posbox.in/wp-content/uploads/2025/02/4.jpg"
    ],
    badge: "PACK DEAL",
    badgeColor: "#8e44ad"
  },
  {
    id: 8,
    category: "paper-rolls",
    categoryLabel: "Paper Rolls",
    name: "Thermal Paper Rolls — 3 Inch",
    subtitle: "Multiple Pack Options / 25 Meter Each",
    price: 450,
    originalPrice: null,
    discount: null,
    description: "Thermal paper rolls for 3 inch printers. 80mm width, 25 meters per roll. Available in sets of 10, 50, and 100 rolls. Black ink. Perfect for all 80mm thermal printers.",
    specs: {
      "Type": "Receipt",
      "Width": "80mm / 3 inch",
      "Length": "25 Meters/roll",
      "Packs": "10 / 50 / 100 rolls",
      "Ink": "Black"
    },
    images: [
      "https://posbox.in/wp-content/uploads/2024/11/Roll_8025_10.jpg",
      "https://posbox.in/wp-content/uploads/2024/11/15-3.jpg",
      "https://posbox.in/wp-content/uploads/2024/11/7-3.jpg"
    ],
    variants: [
      { label: "10 Rolls", price: 450 },
      { label: "50 Rolls", price: 1749 },
      { label: "100 Rolls", price: 2999 }
    ],
    badge: "PACK DEAL",
    badgeColor: "#8e44ad"
  },
  {
    id: 9,
    category: "barcode-scanner",
    categoryLabel: "Barcode Scanner",
    name: "1D Barcode USB Handheld Scanner",
    subtitle: "Wired Gun Type | CCD Technology",
    price: null,
    originalPrice: null,
    discount: null,
    description: "1D Barcode USB Scanner Handheld Wired (Gun Type) with Fast Scanning CCD Technology. USB connectivity, No battery required. Supports 1D barcodes, continuous scanning mode. CMOS technology for enhanced performance in low-light. Ergonomic gun-shaped design for comfort. Color: Black.",
    specs: {
      "Connectivity": "USB (Wired)",
      "Battery": "No Battery Required",
      "1D Barcodes": "Yes",
      "2D / QR Codes": "No",
      "Technology": "CCD / CMOS",
      "Scanning Mode": "Continuous",
      "Color": "Black"
    },
    images: [
      "https://posbox.in/wp-content/uploads/2024/11/Main-6.jpg",
      "https://posbox.in/wp-content/uploads/2024/11/1-42.jpg",
      "https://posbox.in/wp-content/uploads/2024/11/2-24.jpg",
      "https://posbox.in/wp-content/uploads/2024/11/3-27.jpg",
      "http://posbox.in/wp-content/uploads/2024/11/1-43.jpg",
      "http://posbox.in/wp-content/uploads/2024/11/2-25.jpg",
      "http://posbox.in/wp-content/uploads/2024/11/3-28.jpg",
      "http://posbox.in/wp-content/uploads/2024/11/4-20.jpg",
      "http://posbox.in/wp-content/uploads/2024/11/5-16.jpg"
    ],
    badge: "POPULAR",
    badgeColor: "#D4AF37"
  }
];

// =============================================
// GOOGLE FORM CONFIGURATION
// Replace with your actual Google Form details
// =============================================
const GOOGLE_FORM_CONFIG = {
  // Your Google Form action URL (from: Responses → Get pre-filled link → replace /viewform with /formResponse)
  formAction: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
  
  // Map field names to Google Form entry IDs (entry.XXXXXXXXX)
  fields: {
    name:    "entry.1234567890",   // Replace with your Name field entry ID
    phone:   "entry.0987654321",   // Replace with your Phone field entry ID
    message: "entry.1122334455",   // Replace with your Message field entry ID
    product: "entry.5566778899"    // Replace with your Product field entry ID (optional)
  }
};

// Export for use in main script
if (typeof module !== 'undefined') {
  module.exports = { PRODUCTS, GOOGLE_FORM_CONFIG };
}
