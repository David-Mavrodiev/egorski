'use strict';

const PORT = process.env.PORT || 3001;

const app = require('./config/app');

app.listen(PORT, () => console.log(`Magic happening at http://localhost:${PORT}`));