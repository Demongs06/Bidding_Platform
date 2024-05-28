# Real-Time Bidding Platform API

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Setup environment variables in a `.env` file
4. Start the server: `npm start`

## API Endpoints

### Users
- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user and return a token.
- `GET /users/profile` - Get the profile of the logged-in user.

### Items
- `GET /items` - Retrieve all auction items (with pagination).
- `GET /items/:id` - Retrieve a single auction item by ID.
- `POST /items` - Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id` - Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id` - Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids
- `GET /bids/:itemId` - Retrieve all bids for a specific item.
- `POST /bids/:itemId` - Place a new bid on a specific item. (Authenticated users)

### Notifications
- `GET /notifications` - Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read` - Mark notifications as read.

### WebSocket Events
- `connection` - Establish a new WebSocket connection.
- `bid` - Place a new bid on an item.
- `update` - Notify all connected clients about a new bid on an item.
- `notify` - Send notifications to users in real-time.

## Additional Features
- JWT (JSON Web Tokens) for authentication.
- Role-based access control to restrict access to certain endpoints based on user roles.
- Data validation and error handling.
- Image upload functionality for auction items.
- Pagination for the `GET /items` endpoint.
- Notification system to notify users about bids on their items and when they are outbid.
