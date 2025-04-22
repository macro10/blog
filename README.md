# Blog Application

A full-stack blog application that allows users to create and manage blog posts. This project was developed as part of the [Full Stack Open](https://fullstackopen.com/) course by the University of Helsinki, with additional modifications and improvements.

## Features

- User authentication (login/register)
- Create, read, update, and delete blog posts
- Like blog posts
- Responsive design
- Secure API with JWT authentication
- Automated testing suite

## Tech Stack

### Frontend
- React 18
- Vite
- Axios for API requests
- ESLint for code quality
- Playwright for E2E testing

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Playwright for E2E testing

## Prerequisites

- Node.js version 20.11.0 required
- MongoDB instance
- npm or yarn package manager

## Installation

### Backend Setup

1. Clone the repository
```bash
git clone [https://github.com/macro10/blog]
cd blog/backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_mongodb_connection_string
PORT=3001
SECRET=your_jwt_secret

4. Start the backend server
```bash
# Development mode
npm run dev

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Testing

### E2E Testing
```bash
cd playwright
npm test
```

## Deployment

The application is configured for deployment using Fly.io.

To deploy the full application:
```bash
cd backend
npm run deploy:full
```

This will:
1. Build the frontend
2. Copy the build to the backend
3. Deploy the application to Fly.io

## Project Structure

```
blog/
├── frontend/
│   ├── src/
│   ├── public/
│   └── dist/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   └── tests/
└── playwright/
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/users` - User registration

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License

## Attribution

This project is based on the Blog List application from the [Full Stack Open](https://fullstackopen.com/en/) course by the University of Helsinki. The core functionality and initial implementation were developed following the course material, with personal modifications and enhancements added.

- Original course material: [Full Stack Open](https://fullstackopen.com/en/)
- Course provider: Department of Computer Science, University of Helsinki
- Course license: [Creative Commons BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)

## Author

McHale Trotter

*Project developed as part of Full Stack Open coursework with additional personal modifications.*

## Acknowledgments

- University of Helsinki's Full Stack Open course team for the excellent educational material and base implementation
- React and Node.js communities
- Course instructors and staff at the University of Helsinki
