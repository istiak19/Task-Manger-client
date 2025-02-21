# 📝 Task Manager  

Task Manager is a responsive and real-time task management application that helps users efficiently organize their tasks into three categories: **To-Do, In Progress, and Done**.  

The application supports **Firebase Authentication (Google Sign-In)** for secure user access and provides features like task **creation, editing, deletion, and drag-and-drop reordering**.  

It uses **React Query** for seamless data fetching and updates, ensuring smooth performance. Task timestamps are stored on the **server-side** but displayed in a user-friendly format on the client-side.  

With a **clean and responsive UI**, Task Manager provides a smooth experience across all devices.  

## 🚀 Live Demo  
🔗 **[Task Manager](https://task-manger-cb5df.web.app/)**  

---

## 📌 Features  

- ✅ **User Authentication** via Firebase (Google Sign-In)  
- 📌 **Task Management**: Create, edit, delete, and reorder tasks  
- 🔄 **Drag-and-Drop** functionality for easy task movement  
- 🔥 **Real-time Updates** with React Query  
- 🌍 **Responsive UI** for seamless experience across devices  
- ⏳ **Server-side Timestamps** displayed in human-readable format  

---

## 🛠️ Technologies Used  

- **Frontend:** React, React Router, TailwindCSS, DaisyUI  
- **State Management & Data Fetching:** Tanstack/react-query  
- **Drag-and-Drop:** React DnD  
- **Backend & Authentication:** Firebase  
- **Utilities:** Axios, date-fns  

---

## 📦 Dependencies  

```json
"dependencies": {
  "@tailwindcss/vite": "^4.0.7",
  "@tanstack/react-query": "^5.66.7",
  "axios": "^1.7.9",
  "date-fns": "^4.1.0",
  "firebase": "^11.3.1",
  "react": "^19.0.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dom": "^19.0.0",
  "react-router": "^7.2.0",
  "tailwindcss": "^4.0.7"
}
```

---

## 🔧 Installation  

Follow these steps to set up the project locally:  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies  
```sh
npm install
```
### 4️⃣ Start the Development Server  
```sh
npm run dev
```