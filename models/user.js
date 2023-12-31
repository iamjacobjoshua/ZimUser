const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema  = new mongoose.Schema({

fullname :{
      type  : String,
      required : true
  } ,

username :{
    type  : String,
    required : true
} ,
  email :{
    type  : String,
    required : true
} ,
telephone :{
    type  : Number,
    required : true
} ,

referralCode :{
    type  : String,
    } ,
password :{
    type  : String,
    required : true
} ,

////////////////////////////////////////////////////////////////
referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

hasInvested :{
    type  : Boolean,
    default : false
} ,


refLink :{
    type  : String,
    default :"www.zim-energy.com"
} ,


balance : {
    type: Number, 
    default: 0
    },

assets: {
     type: Number, 
     default: 0
     },

todayIncome: {
        type: Number, 
        default: 0
        },

teamIncome: {
            type: Number, 
            default: 0
            },

totalIncome: {
         type: Number, 
         default: 0
         },
         
withdrawable: {
            type: Number, 
            default: 0
            },
   
machineRunning: {
    type :String,
    default :"Current machine"
},

dailyPay: {
    type :Number,
    default :"0"
},

machineReturn: {
    type :Number,
    default :"0"
},



date :{
    type : Date,
    default :Date.now()
}


});




const User= mongoose.model('User' ,UserSchema);

module.exports = User;