# Abhijeet Rane Youth Foundation Website

A modern, responsive website for the Abhijeet Rane Youth Foundation, built with pure HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📱 Mobile-first approach with full tablet and desktop support
- 🔒 Secure backend with Express.js and MongoDB
- 📧 Contact form with validation and email notifications
- ⚡ Fast and optimized performance
- 🎯 SEO-friendly structure

## Tech Stack

### Frontend
- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer for email notifications

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd abhijeet-rane-foundation
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Configure email settings for contact form notifications
   - Adjust other settings as needed

5. Start MongoDB (if running locally):
\`\`\`bash
mongod
\`\`\`

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open your browser and visit:
\`\`\`
http://localhost:3000
\`\`\`

## Production Deployment

1. Build for production:
\`\`\`bash
npm start
\`\`\`

2. Set `NODE_ENV=production` in your environment

3. Use a process manager like PM2:
\`\`\`bash
npm install -g pm2
pm2 start server.js --name "abhijeet-rane-foundation"
\`\`\`

## Project Structure

\`\`\`
abhijeet-rane-foundation/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   └── js/
│       └── main.js        # Client-side JavaScript
├── models/                # MongoDB models
│   └── Contact.js         # Contact form model
├── routes/                # API routes
│   └── contact.js         # Contact form routes
├── utils/                 # Utility functions
│   └── email.js          # Email service
├── server.js             # Express server
├── package.json          # Dependencies
├── .env.example          # Environment variables template
└── README.md             # Documentation
\`\`\`

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
  - Body: `{ name, email, phone, program, message }`
  - Returns: `{ success, message, data }`

### Health Check
- **GET** `/api/health` - Server health status

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Flexible grid layouts
- Touch-friendly navigation

### Animations
- Scroll-triggered animations using Intersection Observer
- Smooth transitions and hover effects
- Animated counters for statistics
- Floating card effects with parallax

### Form Validation
- Real-time client-side validation
- Server-side validation with express-validator
- Email format validation
- Phone number validation
- Required field checks

### Security
- Helmet.js for security headers
- Rate limiting to prevent abuse
- CORS configuration
- Input sanitization
- Environment variable protection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Contact

For questions or support, please contact:
- Email: info@abhijeetranefoundation.org
- Website: [Your Website URL]
\`\`\`
