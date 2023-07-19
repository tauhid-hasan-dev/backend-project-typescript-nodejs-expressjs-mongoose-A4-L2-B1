# Cow Hut Admin With Auth- Backend Assignment 4 - Tauhid Hasan

### Github Private Repository: https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-tauhid-hasan-dev
### Live Link: https://level-2-assignment-4-tauhidhasan.vercel.app/
---
### Important features implimented in this project:

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
  
  ## Main part
  
   ### Auth (User)
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/auth/login (POST)
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/auth/signup (POST)
   - Route:  https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/admins/login (POST)
   
   ### User
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users (GET) → Admin
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users/64b810552d166d0d5289e241 (Single GET) → Admin
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users/64b810552d166d0d5289e241 (PATCH) → Admin
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users/64b810552d166d0d5289e241 (DELETE) → Admin

   #### Cows
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/cows (POST) → Seller
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/cows (GET) → Admin, Seller, Buyer
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (Single GET) → Admin, Seller, Buyer
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (PATCH) → Seller
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (DELETE) → Seller

   #### Orders
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/orders (POST)
   - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/orders (GET)

 ## Bonus Part

#### Admin
   -Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users/my-profile (GET)
- Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:
 - Route: https://level-2-assignment-4-tauhidhasan.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)
