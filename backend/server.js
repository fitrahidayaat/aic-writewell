const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { exec } = require("child_process");
const fs = require("fs");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Middleware to authenticate and extract userId
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.user = user; // Attach user info to request
        next();
    });
};

app.post("/api/predict", authenticateToken, async (req, res) => {
    const essay = req.body.essay; // Replace this with the actual input

    exec(
        `python ./Scoring/score_predict.py "${essay}"`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }

            // Read the output from the text file
            fs.readFile("prediction_output.txt", "utf8", async (err, data) => {
                if (err) {
                    console.error(`readFile error: ${err}`);
                    return;
                }

                const resData = await prisma.history.create({
                    data: {
                        userId: req.user.userId,
                        content: essay,
                        question: req.body.question,
                        score: parseFloat(data),
                    },
                });

                res.status(200).send(resData);
            });
        }
    );
});

// Signup Route
app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the new user
        console.log(username, email, hashedPassword);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Generate a JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ message: "User created", token });
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

// Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare the password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

app.post("/api/validate-token", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Token is valid",
            userId: decoded.userId,
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});

app.get("/api/history", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from decoded token
        const histories = await prisma.history.findMany({
            where: {
                userId: userId,
            },
        });

        res.status(200).json(histories);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching history",
        });
    }
});

app.get("/api/history/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from decoded token
        const historyId = parseInt(req.params.id);

        const history = await prisma.history.findUnique({
            where: {
                id: historyId,
            },
        });

        if (!history || history.userId !== userId) {
            return res.status(404).json({ error: "History not found" });
        }

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching history",
        });
    }
});

// Get current user details
app.get("/api/current-user", authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId, // Use userId from validated token
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Exclude sensitive fields like password
        const { password, ...userDetails } = user;
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching user details",
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
