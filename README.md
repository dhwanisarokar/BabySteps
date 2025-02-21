# BabySteps Appointment Booking System

## Overview
BabySteps is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for booking prenatal care appointments. Users can select doctors, view available slots, and book, edit, or cancel appointments seamlessly.

## Features
- **Doctor Selection**: Browse a list of available doctors.
- **Slot Booking**: View available slots for the next 7 days.
- **Appointment Management**: Book, update, and cancel appointments.
- **Validation**: Users cannot book past dates or past slots for the current day.
- **Context API**: Used for state management.
- **Responsive UI**: Built with Tailwind CSS for a modern and minimal design.

## Tech Stack
- **Frontend**: React, React Router, Context API, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB with Mongoose ORM
- **API**: RESTful API with authentication (if needed)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### Backend Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Doctor Endpoints
- `GET /doctors` - Retrieve all doctors.
- `GET /doctors/:id/slots?date=YYYY-MM-DD` - Get available time slots for a doctor on a specific date.

### Appointment Endpoints
- `GET /appointments` - Retrieve all appointments.
- `GET /appointments/:id` - Get details of a specific appointment.
- `POST /appointments` - Create a new appointment.
- `PUT /appointments/:id` - Update an appointment (change date/slot, etc.).
- `DELETE /appointments/:id` - Cancel an appointment.


## Usage
- Navigate to `http://localhost:5173/` (or your frontend port) to use the application.
- Select a doctor and view available slots.
- Book, edit, or delete appointments from the dashboard.

## Future Enhancements
- Authentication & Authorization (JWT)
- Email notifications for appointments
- Role-based access control (Admin, Doctor, Patient)

## Contributing
Feel free to submit issues and pull requests.

## License
MIT License.

