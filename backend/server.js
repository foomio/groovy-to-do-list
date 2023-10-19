const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Set your desired port

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost/todo_list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const suggestionSchema = new mongoose.Schema({
  suggestion: String,
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

app.use(cors());
app.use(express.json());

// Define a route to handle suggestions based on user input
app.get('/suggestions', async (req, res) => {
  const partialTask = req.query.partial;
  if (partialTask.length > 2) {
    const suggestions = await Suggestion.find({
      suggestion: { $regex: partialTask, $options: 'i' },
    });
    res.json(suggestions.map((suggestion) => suggestion.suggestion));
  } else {
    res.json([]);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
