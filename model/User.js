'use strict';

/**
 * Module dependencies.
 */

const mongoose=require('mongoose') // mongoose object

const userSchema = new mongoose.Schema(
    {
     firstName : {type:String,require:true},
     lastName : {type:String,require:true},
     gender : {type:String,require:true},
     dob : Date,
     password : String,
     token : String,
     email : {
        type: String,
        unique : true,
        lowercase: true,
        required: true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
          }
     }
    });

// Export this model object
module.exports = mongoose.model('User',userSchema);