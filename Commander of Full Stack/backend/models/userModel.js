const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name must be at least 4 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [8, "Password should be at least 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: [true, "User image public_id is required"],
      },
      url: {
        type: String,
        required: [true, "User image url is required"],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  // console.log(this);
  if (!this.isModified("password")) {
  } else {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// JWT TOKEN
userSchema.methods.getJWTToKen = function () {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE;
  const jwtToken = jwt.sign({ id: this._id }, secret, { expiresIn });
  return jwtToken;
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
