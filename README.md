# Digital Cow Hut Backend Assignment - Tauhid Hasan

### Github Private Repository: https://github.com/Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-tauhid-hasan-dev
### Live Link: https://digital-cow-hut-backend-blue.vercel.app
---
### Important features of this project:

- Implement error handling
- CRUD operations
- pagination and filtering
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
