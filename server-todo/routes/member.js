const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const Member = require("../models/member");
const mongoose = require("mongoose");

router.use(bodyParser.json());
router.use(cors());

// get all members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a new member
router.post("/", async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get a member by id
router.get("/:id", getMember, (req, res) => {
  res.json(res.member);
});

// update a member by id
router.patch("/:id", getMember, async (req, res) => {
  if (req.body.name != null) {
    res.member.name = req.body.name;
  }
  if (req.body.email != null) {
    res.member.email = req.body.email;
  }
  if (req.body.skills != null) {
    res.member.skills = req.body.skills;
  }
  if (req.body.linkedin != null) {
    res.member.linkedin = req.body.linkedin;
  }
  if (req.body.github != null) {
    res.member.github = req.body.github;
  }
  if (req.body.age != null) {
    res.member.age = req.body.age;
  }
  if (req.body.image != null) {
    res.member.image = req.body.image;
  }
  if (req.body.admin != null) {
    res.member.admin = req.body.admin;
  }
  if (req.body.language != null) {
    res.member.language = req.body.language;
  }
  try {
    const updatedMember = await res.member.save();
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a member by id
router.delete("/:id", getMember, async (req, res) => {
  try {
    await res.member.remove();
    res.json({ message: "Member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
async function getMember(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id);
    if (member == null) {
      return res.status(404).json({ message: "Member not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.member = member;
  next();
}
module.exports = router;
