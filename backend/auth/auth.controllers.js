import User from "./auth.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
