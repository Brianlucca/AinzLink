# AinzLink - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A sleek, modern, and feature-rich frontend for a powerful URL shortener application. Built with React and styled with Tailwind CSS, this project provides a seamless user experience for creating and managing short links without requiring user accounts.

**[Live Demo](https://ainzlink.com)** &nbsp;&nbsp;·&nbsp;&nbsp; **[Backend Repository](https://github.com/Brianlucca/AinzLink-BackEnd)**

---

## ✨ Features

* **Dynamic Shortening:** Create short, random links or custom-named aliases.
* **Advanced Link Options:**
    * **Password Protection:** Secure your links with a password.
    * **Expiration Dates:** Set links to expire automatically on a specific date.
* **Account-less Management:** Each created link comes with a secret **Admin URL** for managing its settings.
* **Real-time Statistics:** The Admin Page features a real-time click counter powered by WebSockets.
* **QR Code Generation:** Instantly generate and view a QR code for any shortened link.
* **Responsive Design:** A beautiful, responsive layout that works on desktop and mobile, built with Tailwind CSS.
* **Interactive UI:**
    * Smart loading states to handle backend server spin-up time.
    * "Copy to Clipboard" functionality for easy sharing.
    * Clean, component-based architecture using React Router for navigation.

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) (via Vite)
* **Language:** JavaScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Real-time Communication:** [Socket.IO Client](https://socket.io/)
* **QR Code Generation:** [qrcode.react](https://github.com/zpao/qrcode.react)
