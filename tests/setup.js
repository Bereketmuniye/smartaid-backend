const { connectDB } = require('../src/config');
require('dotenv').config();

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
    // Add any necessary teardown logic here, such as closing the database connection
    });