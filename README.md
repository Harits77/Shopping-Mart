# E-Commerce Shopping Application

A modern React-based e-commerce application built with Vite, featuring product browsing, detailed product views, and a shopping cart with local storage persistence.

## 🚀 Features

- **Product Dashboard**: Browse all available products
- **Product Details**: View detailed information about individual products
- **Shopping Cart**: Add/remove products with persistent storage
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **State Management**: Uses Zustand for efficient state management
- **Routing**: Client-side routing with React Router

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Linting**: ESLint

## 📁 Project Structure

```
E-Commerce/
├── public/                          # Static assets
├── src/
│   ├── assets/                      # Images, icons, and other assets
│   ├── Pages/                       # React components for different pages
│   │   ├── Cart.jsx                 # Shopping cart page
│   │   ├── Dashboard.jsx            # Main product listing page
│   │   └── Product.jsx              # Individual product detail page
│   ├── store/
│   │   └── UseProductStore.js       # Zustand store for state management
│   ├── App.jsx                      # Main application component with routing
│   ├── index.css                    # Global styles and Tailwind imports
│   └── main.jsx                     # Application entry point
├── eslint.config.js                 # ESLint configuration
├── index.html                       # Main HTML template
├── package.json                     # Project dependencies and scripts
├── vite.config.js                   # Vite build configuration
└── README.md                        # Project documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory
2. **Navigate to the E-Commerce directory**:
   ```bash
   cd E-Commerce
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```
2. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📱 Usage

- **Dashboard (/)**: View all available products
- **Product Details (/product/:id)**: Click on any product to view detailed information
- **Cart (/cart)**: Access your shopping cart to view added items

## 🔧 Configuration

The application uses the [Fake Store API](https://fakestoreapi.com/) for product data. The API endpoints are configured within the Zustand store.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

