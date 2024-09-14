const express = require('express');
const app = express();
const questionRoute = require('./routes/questionRoute');
const cors = require('cors')



const PORT = 3000;

app.use(cors())
app.use('/api/questions', questionRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});