import Admin from "../models/admin.model";
import bcrypt from 'bcrypt'

exports.createAdmin = async (req: any, res: any) => {
    try {
        const { name, password, email } = req.body;

        // input validation
        if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Invalid or missing 'name'." });
        }

        // password validation
        if (!password || typeof password !== "string") {
            return res.status(400).json({ message: "Invalid or missing 'password'." });
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|np|in)$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid or missing 'email'." });
        }

        // password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // create and save admin (store hashed password)
        const admin = new Admin({ name, password: hashedPassword, email });
        await admin.save();

        // remove password before sending response
        const adminObj = admin.toObject ? admin.toObject() : { ...admin };
        const { password: _password, ...safeAdminObj } = adminObj as any;

        return res.status(201).json(safeAdminObj);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


