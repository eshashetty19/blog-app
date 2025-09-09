# Simple Blog App 📝  

A simple **Blog Application** built with **Node.js, Express.js, EJS, and PostgreSQL** that supports **CRUD operations** (Create, Read, Update, Delete) for blog posts.  

## 🚀 Features  
- Create a new blog post  
- View all posts 
- Update existing posts   
- Delete posts 
- Uses PostgreSQL for database storage  
- EJS for templating  
- Responsive UI with HTML & CSS  

## 🛠️ Tech Stack  
- **Frontend:** HTML, CSS, EJS  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  


## ⚙️ Installation & Setup  

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app

2. Install dependencies
   ```bash
   npm install

3. Setup PostgreSQL Database
   ```sql
   CREATE DATABASE blogdb;

   CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE
  );

4. Configure database connection
    ```js
    const db = new pg.Client({
    user: "your-username",
    host: "localhost",
    database: "blogdb",
    password: "your-password",
    port: 5432,
    });
    db.connect();

5. Run the app
   ```bash
   node index.js

Now open  http://localhost:3000
