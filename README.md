# Partner Management Application

## High-level Overview
This project is a web application that allows users to manage partners of C4C organization. Users can add, edit, search, and delete partners. The frontend is built with React, and the backend is built with Node.js and Express, using SQLite for the database.

## Features
- **Add New Partner:** Users can add new partners via a form.
- **Edit Partner:** Users can update the name, description, and status of a partner.
- **Delete Partner:** Users can delete a partner.
- **Search and Filter:** Users can search for partners by name and filter by active status.
## Design Decisions
- **Frontend:** Chose React for its component-based architecture and ease of use.
- **Backend:** Used Express for its simplicity and flexibility in handling HTTP requests.
- **Database:** SQLite was selected as a database to store partners.
- **Docker:** Added Docker support to ensure the application can run in a consistent environment, regardless of where it's deployed.

## Instructions to Start the Application

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerized deployment)

### Steps to Install and Start the Application Without Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nadishiro17/c4c-new
   cd c4c-new
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile TypeScript files:**
   ```bash
   npx tsc
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - The backend server will be running on `http://localhost:4000`
   - The frontend can be accessed at `http://localhost:3000` (if you're using a tool like `create-react-app` for the frontend)

### Steps to Install and Start the Application With Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nadishiro17/c4c-new
   cd c4c-new
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t <image-name> .
   ```

3. **Run the Docker container:**
   ```bash
   docker run -p 4000:4000 <image-name>
   ```

4. **Alternatively, use Docker Compose:**
   ```bash
   docker-compose up
   ```

5. **Access the application:**
   - The backend server will be running on `http://localhost:4000`
   - The frontend can be accessed at `http://localhost:3000` (if you're using a tool like `create-react-app` for the frontend)

## Reflection

### Learning and Improvements
- **Learning:** I learned how to effectively integrate a frontend and backend, manage state in React, and set up routing and database operations in Express.
- **Improvements:** If I had more time, I would add more comprehensive error handling, implement user authentication, and improve the UI/UX design.
- **Challenges:** One of the challenges was ensuring data consistency between the frontend and backend. I solved this by thoroughly testing and debugging the data flow.
- **Docker Integration:** I chose to implement Docker to ensure that the application can run in any environment with minimal setup, which is beneficial for development and deployment consistency.

## Conclusion
This project was a valuable learning experience in building a full-stack application. The integration of different technologies and the addition of Docker support helped solidify my understanding of modern web development practices.
