import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const UserModel = mongoose.model('User', userSchema);

export const getUser = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentications.sessionToken': sessionToken,
});
export const createUser = (user: Record<string, any>) => 
    new UserModel(user).save().then((user)=> user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({_id:id});
export const updateUserById = (id: string, update: Record<string, any>) => 
    UserModel.findByIdAndUpdate(id, update);


