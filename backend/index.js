const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Sample user data
const user = {
  full_name: "Yanamadala Sai Chakrin",
  dob: "11052003",
  email: "yanamadalasai.chakrin2021@vitstudent.ac.in",
  roll_number: "21BCE1868",
};

// POST Method: Process user input
app.post('/bfhl', (req, res) => {
  try {
    const inputData = req.body.data || [];
    const numbers = inputData.filter(item => !isNaN(item)); // Check for numbers
    const alphabets = inputData.filter(item => /^[A-Za-z]+$/.test(item)); // Check for alphabets

    // Find the highest lowercase alphabet
    const lowerCaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercase = lowerCaseAlphabets.length ? lowerCaseAlphabets.sort().pop() : null;

    const response = {
      is_success: true,
      user_id: `${user.full_name}_${user.dob}`,
      email: user.email,
      roll_number: user.roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

// GET Method: Return operation_code
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
