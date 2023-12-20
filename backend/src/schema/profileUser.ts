// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const ProfileUserItem = new mongoose.Schema({
  login: String,
  userName: String,
});

export const ProfileUserModel = mongoose.model('profileUser', ProfileUserItem);
