# Cow Hut Admin Project With Auth by Tauhid Hasan

### Server Live Link: https://backend-server-a4-l2-b1.vercel.app/
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
  
   ### Auth (User)
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/auth/login (POST)
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/auth/signup (POST)
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/admins/login (POST)
   
   ### User
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users (GET) → Admin
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users/64b810552d166d0d5289e241 (Single GET) → Admin
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users/64b810552d166d0d5289e241 (PATCH) → Admin
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users/64b810552d166d0d5289e241 (DELETE) → Admin

   #### Cows
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/cows (POST) → Seller
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/cows (GET) → Admin, Seller, Buyer
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (Single GET) → Admin, Seller, Buyer
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (PATCH) → Seller of that cow
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/cows/64b82b859bd3f0265e9b7b85 (DELETE) → Seller of that cow

   #### Orders
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/orders (POST) → Buyer
   - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/orders (GET) → Admin

#### Admin
   -Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users/my-profile (GET)
- Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/users/my-profile (PATCH)

#### Order:
 - Route: https://backend-server-a4-l2-b1.vercel.app/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET) → Admin, Specific Buyer, Specific Seller
