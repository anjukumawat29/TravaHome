const User = require("../models/users");

module.exports.signUpForm = (req,res)=>{
 res.render("users/signup");
};
module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password}= req.body;
        const newUser = new User({email,username});
        const registeredUser= await User.register(newUser,password);
    req.logIn(registeredUser,(err)=>{
        if(err){
         return next(err);
        }
        req.flash("success","Welcome to TravaHome.");
        res.redirect("/listings");
    });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm =(req,res)=>{
 res.render("users/login");
};

module.exports.login = async(req,res)=>{
        req.flash("success","Welcome back to TravaHome.");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
         return next(err);
        }
        req.flash("success","You're logged out now.");
        res.redirect("/listings");
    });
  
};
module.exports.showWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.render('account/wishlist', { listings: user.wishlist });
};

module.exports.addToWishlist = async (req, res) => {
  const listingId = req.params.id;
  const user = await User.findById(req.user._id);
  if (!user.wishlist.includes(listingId)) {
    user.wishlist.push(listingId);
    await user.save();
  }
  res.redirect('back');
};

module.exports.removeFromWishlist = async (req, res) => {
  const listingId = req.params.id;
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: listingId }
  });
  res.redirect('back');
};