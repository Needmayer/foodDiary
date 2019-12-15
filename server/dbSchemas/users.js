import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    recipeIds: [],
    menu: {}
});

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            next(err);
            return;
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.passwordIsValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
};

const User = mongoose.model('User', userSchema)

export default User
