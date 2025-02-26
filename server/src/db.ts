import mongoose from "mongoose";
const Schema = mongoose.Schema;

// const User = new Schema({
//     username: { type: String, required: true,unique:true },
//     password: { type: String, required: true }
// });

// const Tag = new Schema({
//     title: { type: String, required: true }
// });

// const Link = new Schema({
//     hash: { type: String, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// const Content = new Schema({
//     link: { type: String, required: true },
//     type: { type: String, required: true },
//     title: { type: String, required: true },
//     tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// export const UserModel = mongoose.model('User', User);
// export const TagModel = mongoose.model('Tag', Tag);
// export const LinkModel = mongoose.model('Link', Link);
// export const ContentModel = mongoose.model('Content', Content);

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true ,unique:true},
    password: { type: String, required: true }
});

export const UserModel = mongoose.model('User', UserSchema);

const contentSchema = new mongoose.Schema({
    link: { type: String, required: false}, // Made link optional
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['youtube', 'tweet', 'project'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

export const ContentModel = mongoose.model('Content', contentSchema);

const TagSchema = new Schema({
    title: { type: String, required: true }
});

export const TagModel = mongoose.model('Tag', TagSchema);

const LinkSchema = new Schema({
    hash: { 
        type: String, 
        required: true,
        unique: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

export const LinkModel = mongoose.model('Link', LinkSchema);
