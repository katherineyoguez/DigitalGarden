const {User} = require('../models')
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers={
    Query:{
        me: async(parent, args, context)=>{
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not Logged In');
        }
    },
    Mutation:{
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);
            return{token, user};
        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token  =signToken(user);
            return {token, user};
        },
        
        savePlants: async(parent, args, context)=>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedPlants: args}},
                    {new: true, runValidators: true}
                );
                return updatedUser;
            }
            throw new Error('Couldnt not add Plant!');
        },
        
        removePlants: async (parent, {plantsId}, context) =>{
            if(context.user){
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedPlants: {plantsId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('Couldnt not delete plant!');
        }
    }
};

module.exports = resolvers;