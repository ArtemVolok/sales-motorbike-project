// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const ProfileUserItem = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export const ProfileUserModel = mongoose.model('profileUser', ProfileUserItem);
