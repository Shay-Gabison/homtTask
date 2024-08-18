# URL Metadata Fetcher

This is a simple full-stack application that allows users to input a list of URLs and fetches metadata (title, description, image) for each URL.

## Setup Instructions

### Front-End (React)
1. Navigate to the `client/` directory.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm start` to start the development server.

### Back-End (Node.js)
1. Navigate to the `server/` directory.
2. Run `npm install` to install the necessary dependencies.
3. Run `node index.js` to start the server.

### Testing
For testing, consider using Jest for React components and Mocha for Node.js.

### Deployment
You can deploy the app on platforms like Heroku or Vercel.

### Design Choices
- **Rate Limiting**: Implemented to prevent server overload.
- **Error Handling**: Ensures users are informed of issues during metadata fetching.
