const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@store.com" });

    if (!adminExists) {
      await Admin.create({
        username: "SuperAdmin",
        email: "admin@store.com",
        password: "password123",
        role: "superadmin",
      });
      console.log("Default admin created: admin@store.com / password123");
    } else {
      console.log("Admin details already exist.");
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};

module.exports = seedAdmin;
