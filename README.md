# Task Management Application

Simple task management application with create, update and delete task.

# Installation
```sh
git clone https://github.com/kalpeshchaudharee/mern-todo-app.git
```
```
cd mern-todo-app
```

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend 
```sh
cd backend
npm install
```

copy .env.example file to .env

change MONGOOSE_URI to add your mongoose connection string in .env

```sh
npm start
```

Terminal 2: Setting Up Frontend
```sh
cd frontend
npm install
```

copy .env.example file to .env
set backend server url on VITE_BACKEND_SERVER_URL in .env

```sh
npm run dev
```