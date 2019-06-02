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
    }
});

// userSchema.pre("save", function(next){
// 
//     bcrypt.hash(this.password, 5, (err, hash) => {
//         if(err){
//             next(err);
//             return;
//         }
//         this.password = hash;
//         next();
//     });
// });

// userSchema.methods.passwordIsValid = function(password, callback){
//     bcrypt.compare(password, this.password, function(err, result){    
//         if(err){
//             callback(false);
//             return;
//         }
//         callback(null, result);
//     });
// };

const User = mongoose.model('User', userSchema)
export default User
