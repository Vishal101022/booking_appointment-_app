const db = require("../util/db");

// create new user
exports.createUser = async (userData) => {
  const { name, phone, email } = userData;
  try {
    const response = await db.query(
      "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)",
      [name, phone, email]
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// get all users
exports.getUsers = async () => {
  try {
    const [result, fields] = await db.query("select id, name, phone, email from users");
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

// delete user
exports.deleteUser = async (id) => {
  try {
    const response = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

// update user
exports.updateUser = async (id, userData) => {
  const { name, phone, email } = userData;
  try {
    const [result, fields] = await db.query(
      "UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?",
      [name, phone, email, id]
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
