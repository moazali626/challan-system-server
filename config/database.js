/* eslint-disable no-undef */
module.exports = {
  url:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_URL
      : process.env.DB_URL,
};
