import mongoose, { Schema } from 'mongoose';

const TokenItem = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'profileUser' },
  refreshToken: { type: String, required: true },
});

export const TokenModel = mongoose.model('token', TokenItem);
