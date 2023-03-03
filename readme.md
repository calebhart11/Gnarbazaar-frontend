#Capstone - Gnarbazaar

## Goal: Create a full stack e-commerce application that enables the user to browse  products, add the products to a cart and checkout. Also supports admin functionality for vendors.

### Technologies used:
- Next.js
- React.js
- Mongodb
- Tailwind
- CSS
- HTML

<!-- ### Daily Plan:
| Day | Goal |
|-----|------|
| 1 | Set Up Basic Running front end and back end repos |
| 2 | Render data to screen |
| 3 | Create all forms |
| 4 | Bug testing, add possible stretch goals |
| 5 | Website Styling / Responsive |
| 6 | Final debugging and styling |
| 7 | Presentation Day | -->

### Site Planning:
[Trello Board](https://trello.com/b/jXdINji4/gnarbazaar)

#### Models:
![Model Image](https://i.imgur.com/4SgOHgi.png)

#### Back End Routes:
- API route to get list of products: '/api/products'
- API route to add a product: '/api/products/add'
- API route to update a product: '/api/products/update'
- API route to delete a product: '/api/products/delete'
- API route to get a single order: '/api/orders/:id'
- API route to get all orders: '/api/orders'
- API route to add an order: '/api/orders/add'
- API route to update an order: '/api/orders/update'
- API route to delete an order: '/api/orders/delete'
- API route to get all users: '/api/users'
- API route to get a single user: '/api/users/:id'
- API route to add
- API route to sign up: '/api/signup'
- API route to sign in: '/api/signin/'

### Front End Routes

Frontend Routes:
- Home page route: '/'
- Product page route: '/products/:id'
- Shopping cart page route: '/cart'
- Checkout page route: '/checkout'
- Login page route: '/login'
- Signup page route: '/signup'
-  messaging page route: '/user/message *