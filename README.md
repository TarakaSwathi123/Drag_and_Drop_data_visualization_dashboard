# React + TypeScript + Vite

# Drag-and-Drop Data Visualization Dashboard 

The dashboard should allow users to configure, rearrange, add, and delete components, with layout adjustments occurring dynamically. Users should be able to save their layout in JSON format, making it configurable and persistent across sessions.

## 🌟 Features

- **Data Loading and State Management**: Fetching cryptocurrency data from https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd  and storing it using Redux.Polling the endpoint every 5 seconds to simulate real-time data updates across all components. 
- **Dynamic and Configurable Dashboard (Drag-and-Drop + Deletion)** :Using React Grid Layout

- **Configurable UI Components**: Table,Graph,Summary
- **Data Manipulation and Filtering**
- **Customizable and Persisted Layout with JSON**


## 🛠️ Technologies Used

### Frontend:

- **React** (v18.3.1)
- **Redux Toolkit** for global state management
- **chart.js** for visualizations
- **react-chartjs-2** for visualizations
- **tailwind css** for styling
- **React Grid Layout** for drag-and-drop interactions
- **RTK Query** - for fetching data 



## 🚀 Live Demo

https://www.loom.com/share/dc7a7952d7f84752a8f59e3316bd6d13?sid=41d76e12-2b68-4165-a8f5-f1b980e88da8

Live Demo 

## 🏁 Getting Started Locally

To get this project running on your local machine, follow these steps:

- Install dependencies 
npm i 

- Run project 

-npm run dev 
