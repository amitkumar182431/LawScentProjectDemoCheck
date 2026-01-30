# LawScent Job Application System Setup

## Overview
This system provides a professional job application form with file upload capabilities that sends applications directly to the recruitment team.

## Features
- Attractive UI/UX with LawScent's gold color theme
- File upload with drag-and-drop support
- Real-time preview of email content
- Form validation and error handling
- Secure file handling with size and type restrictions

## Email Format
When applications are submitted, they will be sent in this exact format:

```
A NEW JOB APPLICATION HAS BEEN RECEIVED. KINDLY REVIEW THE DETAILS BELOW.
👤
[Applicant Name]
[Submission Time]
EMAIL: [Email]

CONTACT: [Contact]

APPLYING FOR: [Application Type]

POSITION: [Position]

MESSAGE:
[Message]

📎 PLEASE CHECK THE ATTACHMENTS FOR THE RESUME/CV.

BEST REGARDS,
LAWSCENT RECRUITMENT SYSTEM
```

## Prerequisites
- Node.js (v14 or higher)
- A Gmail account for sending notifications

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings
1. Open `server.js`
2. Replace `'lawscent.project@gmail.com'` with your Gmail address
3. Replace `'your_app_password'` with your Gmail App Password

### 3. Generate Gmail App Password
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account settings > Security
3. Under "Signing in to Google," select "App passwords"
4. Generate a new app password for this application
5. Use this app password in place of your regular Gmail password

### 4. Start the Server
```bash
npm start
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:3000/job.html
```

## File Upload Specifications
- **Accepted formats**: PDF, DOC, DOCX
- **Maximum file size**: 5MB
- **Files are temporarily stored** in the `uploads/` folder
- **Files are automatically cleaned up** after email is sent

## Form Fields
- **Name** (required)
- **Email** (required, validated)
- **Contact Number** (required)
- **Application Type** (required, dropdown: Internship/Full Time)
- **Position/Role** (required)
- **CV/Resume Upload** (required, file)
- **Consent Checkbox** (required)

## Email Notifications
- All applications are sent to `amitamit182431@gmail.com`
- Resume/CV is attached to the email
- Email includes all application details
- Timestamp of submission is included

## Troubleshooting

### Common Issues:
1. **"Email configuration error"**: Check your Gmail credentials and app password
2. **"File size exceeds 5MB limit"**: Ensure resume is under 5MB
3. **"Invalid file type"**: Only PDF, DOC, and DOCX files are accepted
4. **"Unexpected end of JSON input"**: Server may not be running; ensure `npm start` was executed

### Error Handling:
- The system provides user-friendly error messages
- Invalid inputs are highlighted
- Server returns proper JSON responses for all error conditions
- Uploaded files are cleaned up if email sending fails

## Security Features
- File type validation
- File size limits
- Email format validation
- Proper error handling without exposing system details

## Customization
- Modify colors in the CSS `:root` variables to match your theme
- Adjust form validation rules as needed
- Change email recipient in `server.js`
- Customize email template content in `server.js`

## Production Deployment
When deploying to production:
1. Use environment variables for email credentials
2. Set up proper SSL certificates
3. Configure reverse proxy (Nginx/Apache)
4. Set up process manager (PM2) for server reliability