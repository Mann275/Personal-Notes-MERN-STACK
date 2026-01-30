# User Profile Management Form

A comprehensive React application demonstrating advanced form handling using Formik, Yup validation, and React hooks with modern UI components.

## 🚀 Features

- **Advanced Form Validation**: Complete validation using Yup schema
- **React Hooks**: Comprehensive use of useState, useEffect, and useRef
- **Auto-focus**: Full Name input automatically focused on mount
- **Pre-filled Data**: Simulated API call to pre-populate form fields
- **Loading States**: Visual feedback during form submission
- **Success Notifications**: User feedback after successful submission
- **Responsive Design**: Mobile-friendly interface
- **Modern UI Components**: Tailwind CSS styling

## 🛠️ Technologies Used

- **React 18** - Core framework
- **Formik** - Form state management
- **Yup** - Schema validation
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool
- **CSS3** - Styling and animations

## 📋 Form Fields

- **Full Name** - Required, minimum 3 characters
- **Email** - Required, valid email format
- **Mobile Number** - Required, exactly 10 digits
- **Age** - Required, must be 18 or above
- **Password** - Required, minimum 6 characters
- **Address** - Optional field

## 🎯 React Hooks Implementation

### useState

- `userData` - Stores submitted user data
- `isLoading` - Handles loading state during form submission
- `showSuccess` - Controls success message visibility
- `prefilledData` - Manages pre-filled form data

### useEffect

- **API Simulation**: Pre-fills form data using setTimeout
- **Auto-focus**: Focuses Full Name input on component mount
- **Data Logging**: Logs user data changes when form is submitted

### useRef

- **fullNameRef** - Auto-focuses Full Name input on component mount

## 🚀 Installation & Setup

1. Navigate to the project directory:

   ```bash
   cd d:\Grind\React\prototype\UserProfileForm
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
UserProfileForm/
├── public/
├── src/
│   ├── App.jsx          # Main component with form logic
│   ├── App.css          # Component-specific styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## ✨ Key Features Implemented

### 🔍 Validation Rules

- Full Name: Required, minimum 3 characters
- Email: Required, valid email format
- Mobile: Required, exactly 10 digits
- Age: Required, minimum 18 years
- Password: Required, minimum 6 characters
- Address: Optional

### 🎨 UI Behavior

- Submit button disabled during submission
- "Submitting..." text shown during form submission
- Form resets after successful submission
- Success message displayed for 3 seconds
- Real-time validation error messages

### 🔧 Advanced Features

- Pre-filled data simulation (1-second delay)
- Console logging of form submissions
- Responsive design for mobile devices
- Smooth animations and transitions
- Auto-focus on first input field

## 🎮 Usage

1. The form will automatically pre-fill with sample data after 1 second
2. The Full Name field will be automatically focused
3. Fill out all required fields (marked with \*)
4. The submit button will be disabled until all validations pass
5. Click "Update Profile" to submit the form
6. View the submitted data below the form
7. Check browser console for logged data

## 🌟 Demo

The application includes:

- Real-time form validation
- Loading states and user feedback
- Data persistence and display
- Console logging for debugging
- Mobile-responsive design

---

**Built with ❤️ using React, Formik, and Yup**
