const { signUp, refreshToken, signIn, signOut, getUser } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = require('express').Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

router.get('/getUser', auth, getUser);
router.get('/refresh_token', refreshToken);


module.exports = router;