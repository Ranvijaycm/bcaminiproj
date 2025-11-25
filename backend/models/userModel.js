import db from "../config/db.js";

export const createUser = (userData, callback) => {
    const query = `
        INSERT INTO users (name, email, password, phone, address, role)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        userData.name,
        userData.email,
        userData.password,
        userData.phone,
        userData.address,
        userData.role || "student"
    ];

    db.query(query, values, callback);
};

export const findUserByEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
};

export const getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
};
