
const bcrypt = require('bcrypt');
const User = require('../models/user');

// ... (Validation and hashing functions remain the same)
function validateInputData(reqBody) {
  const { fullname, username, email, telephone, referralCode, password } = reqBody;
  const errors = [];

  if (!fullname || !username || !email || !telephone|| !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if(!referralCode) {
    console.log('no ref')
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    return errors;
  }
  
  // Function to hash the user's password
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  
  
  
  
  // Registration route handler
  async function registerUser(req, res) {
    const errors = validateInputData(req.body);
  
    if (errors.length > 0) {
      return res.render('register', {
        errors,
        ...req.body,
      });
    }
   
  
  
    
  
    const { email, username, referralCode } = req.body;
    let referredBy = null;
  
  
  // Assuming 'bonus' is the value you want to match in the 'telephone' field
  const referral = await User.findOne({ username }).exec();; // Replace this with the actual value you want to match
  
  
  
    try {
      // Check if the email and username are already registered
      const existingEmailUser = await User.findOne({ email }).exec();
      const existingUsernameUser = await User.findOne({ username }).exec();
      const referral = await User.find({ username }).exec();; // Replace this with the actual value you want to match
  
  
  
      const user = await User.findOne({ referralCode: referral  });
      console.log(referralCode)
      console.log(referral)
  
      
  
      if (user) {
        referredBy = user._id;
        console.log('user')
        // User with matching telephone found
        console.log('User found:', user);
      } else {
        console.log('no user')
        errors.push({ msg: 'lol' });
  
        // No user with matching telephone found
  
  
      }
      
  
      if (existingEmailUser) {
        errors.push({ msg: 'Email already registered, please choose another' });
      }
  
      if (existingUsernameUser) {
        errors.push({ msg: 'Username already registered, please choose another' });
      }
  
      if (errors.length > 0) {
        return res.render('register', {
          errors,
          ...req.body,
        });
      }
  
      const hashedPassword = await hashPassword(req.body.password);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
        referredBy, // Assign the referring user (null if no referral code provided)
      });
  
      await newUser.save();
      req.flash('success_msg', 'You have now registered, please login');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  
    }  else{
      console.log("referral")
    }

  

  }

module.exports = registerUser;

