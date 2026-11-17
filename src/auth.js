
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "أدخل اسم المستخدم وكلمة المرور"
      });
    }

    const [admins] = await db.execute(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        message: "بيانات الدخول غير صحيحة"
      });
    }

    const admin = admins[0];

    const validPassword = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "بيانات الدخول غير صحيحة"
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "تم تسجيل الدخول بنجاح",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "حدث خطأ في تسجيل الدخول"
    });
  }
});

module.exports = router;
