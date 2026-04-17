PERSONAL EXPENSE TRACKER - SETUP GUIDE
========================================

REQUIREMENTS:
- XAMPP / WAMP / LAMP with PHP 7.4+ and MySQL
- Web browser

INSTALLATION STEPS:

1. Copy all files to your web server directory:
   - For XAMPP: C:\xampp\htdocs\expense-tracker\
   - For WAMP: C:\wamp\www\expense-tracker\

2. Start Apache and MySQL services

3. Create database:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Go to SQL tab and paste the contents of schema.sql
   - Click "Go" to create database and table

   OR via command line:
   mysql -u root -p < schema.sql

4. Configure database connection (if needed):
   - Open db_config.php
   - Update username/password if different from root/empty

5. Access the application:
   - Open browser and go to: http://localhost/expense-tracker/

USAGE:
- Add expenses using the form (amount, category, description, date)
- Select month/year and click "Generate Report" to view monthly summary
- View pie chart showing category-wise spending
- Delete any expense using the delete button in the table
- Total monthly spending is shown at the top

FEATURES DEMONSTRATED:
✓ Full-stack development (HTML/CSS/JS + PHP/MySQL)
✓ CRUD operations (Create, Read, Delete)
✓ Data visualization with Chart.js
✓ Responsive modern design
✓ AJAX for seamless interactions
✓ Monthly reporting and filtering

TROUBLESHOOTING:
- If you see database errors, check your MySQL credentials in db_config.php
- Ensure Apache has write permissions if needed
- For blank pages, check PHP error logs