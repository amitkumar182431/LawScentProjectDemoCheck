# LawScent Job Application System Setup (EmailJS Version)

## Overview
This system provides a professional job application form with file upload capabilities that sends applications directly to the recruitment team using EmailJS.

## Features
- Attractive UI/UX with LawScent's gold color theme
- File upload with drag-and-drop support
- Real-time preview of email content
- Form validation and error handling
- Integration with EmailJS for email delivery

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
- Internet connection to load EmailJS library
- EmailJS account for sending notifications

## Setup Instructions

### 1. Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/) and sign up for a free account
2. Add your email service provider (Gmail, Outlook, etc.)
3. Create a new email template with the format above
4. Get your Public Key from the EmailJS dashboard

### 2. Configure EmailJS Settings
1. Open `job.html`
2. Replace `"YOUR_PUBLIC_KEY"` with your actual EmailJS public key
3. Replace `'YOUR_SERVICE_ID'` with your actual EmailJS service ID
4. Replace `'YOUR_TEMPLATE_ID'` with your actual EmailJS template ID

### 3. Access the Application
Open `job.html` in your browser directly or host it on a web server.

## File Upload Specifications
- **Accepted formats**: PDF, DOC, DOCX
- **Maximum file size**: 5MB (limited by browser/client)
- **Note**: EmailJS has limitations with file attachments - consider using a cloud storage link instead

## Form Fields
- **Name** (required)
- **Email** (required, validated)
- **Contact Number** (required)
- **Application Type** (required, dropdown: Internship/Full Time)
- **Position/Role** (required)
- **CV/Resume Upload** (required, file)
- **Consent Checkbox** (required)

## Email Notifications
- All applications are sent to the email configured in your EmailJS template
- Email includes all application details
- Timestamp of submission is included

## Troubleshooting

### Common Issues:
1. **"Email configuration error"**: Check your EmailJS service ID, template ID, and public key
2. **"File size exceeds 5MB limit"**: Ensure resume is under 5MB
3. **"Invalid file type"**: Only PDF, DOC, and DOCX files are accepted
4. **"Failed to send application"**: Verify your EmailJS configuration

### Error Handling:
- The system provides user-friendly error messages
- Invalid inputs are highlighted
- Form validation prevents submission of incomplete data

## Security Features
- File type validation
- File size limits
- Email format validation
- Client-side validation

## Customization
- Modify colors in the CSS `:root` variables to match your theme
- Adjust form validation rules as needed
- Change email template in EmailJS dashboard
- Customize email template content in EmailJS dashboard

## Production Deployment
When deploying to production:
1. Use your production EmailJS keys
2. Set up proper SSL certificates if hosting online
3. Test email delivery thoroughly