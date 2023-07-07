const express = require('express');
const router = express.Router();

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhoneNumber(phone) {
    // Regular expression pattern for phone number validation
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

module.exports = function (db) {
    // Handle POST request to /submit
    router.post('/', (req, res) => {
        const { firstName, lastName, email, phone, newsletter, message, interest } = req.body;
        console.log(req.body)
        // Perform server-side validation
        let validationErrors = [];

        // Check if all required variables are defined
        if (!firstName || !lastName || !email || !phone || !newsletter || !message) {
            return res.status(400).send('Missing required form fields.');
        }

        // Validate email
        if (!isValidEmail(email)) {
            validationErrors.push('Please enter a valid email address.');
        }

        // Validate phone number
        if (!isValidPhoneNumber(phone)) {
            validationErrors.push('Please enter a valid phone number.');
        }

        // Validate message length
        if (message.length < 50) {
            validationErrors.push('Please enter a message with at least 50 characters.');
        }

        if (validationErrors.length > 0) {
            // Return validation errors
            res.status(400).json({ errors: validationErrors });
        } else {
            // No validation errors, proceed with saving the form data
            const sql = `INSERT INTO formData (firstName, lastName, email, phone, newsletter, message) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [firstName, lastName, email, phone, newsletter, message];

            db.run(sql, values, function (err) {
                if (err) {
                    console.error('Error inserting form data:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('Form data inserted successfully.');

                    // Retrieve the ID of the newly inserted message
                    const messageId = this.lastID;
                    console.log('Message ID:', messageId);
                    console.log(interest);
                    // Insert the message ID and interest IDs into message_interests table
                    if (typeof interest === 'string' && interest.length > 0) {
                        const interestIds = interest.split(',');
                        const insertSql = `INSERT INTO message_interests (message_id, interest_id) VALUES (?, ?)`;

                        interestIds.forEach((interestId) => {
                            db.run(insertSql, [messageId, interestId], function (err) {
                                if (err) {
                                    console.error('Error inserting message interests:', err);
                                    res.status(500).send('Internal Server Error');
                                }
                            });
                        });

                        console.log('Message interests inserted successfully.');
                        res.status(200).send('Form submitted successfully');
                    } else {
                        // No interests selected, directly send the response
                        console.log('No interests selected.');
                        res.status(200).send('Form submitted successfully');
                    }


                }
            });
        }
    });

    return router;
};