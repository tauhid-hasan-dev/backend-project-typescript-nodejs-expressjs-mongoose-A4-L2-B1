# Cow Hut Admin With Auth- Backend Assignment 4 - Tauhid Hasan

### Github Private Repository: https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-tauhid-hasan-dev
### Live Link: https://level-2-assignment-4-tauhidhasan.vercel.app/
---
### Important features of this project:

- Auth validation
- Hashing password
- Implement error handling
- CRUD operations
- Pagination and filtering
- Transactions and rollback

### Technology used in this project:

- TypeScript as the programming language.
- Express.js as the web framework.
- Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.
---
### Application Routes:

   #### User
   - api/v1/auth/signup (POST)
   - api/v1/users (GET)
   - api/v1/users/64a17fe18f17d914c3e596ba (Single GET) 
   - api/v1/users/64a17fe18f17d914c3e596ba (PATCH)
   - api/v1/users/64a17fe18f17d914c3e596ba (DELETE) 


   #### Cows
   - api/v1/cows (POST)
   - api/v1/cows (GET)
   - api/v1/cows/64a17fae8f17d914c3e596b6 (Single GET) 
   - api/v1/cows/64a17fae8f17d914c3e596b6 (PATCH)
   - api/v1/cows/64a17fae8f17d914c3e596b6 (DELETE) 

   ### Pagination and Filtering routes of Cows

   - api/v1/cows?pag=1&limit=10
   - api/v1/cows?sortBy=price&sortOrder=asc
   - api/v1/cows?minPrice=20000&maxPrice=50000
   - api/v1/cows?location=Barishal
   - api/v1/cows?searchTerm=Bari
     
  
   #### Orders
   - api/v1/orders (POST)
   - api/v1/orders (GET)
