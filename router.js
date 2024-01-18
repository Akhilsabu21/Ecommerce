import { Router } from "express";
import * as controller from './controller.js';
import Auth from './Middleware/Auth.js'
import multer from "multer";

const storage=multer.diskStorage({
    destination:"./Products",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})

const router=Router();

// admin

router.route("/addadmin").post(controller.addAdmin);
router.route("/adminlogin").post(controller.adminLogin);
router.route("/adminHome").get(Auth,controller.adminHome);
router.route("/forgotAdminUserName/:phone").get(controller.forgotAdminUserName);
router.route("/forgotAdminPassword/:phone").patch(controller.foregotAdminPassword);

// admin

// category

router.route('/addCategory').post(upload.single("categoryImage"),controller.addCategories);
router.route('/getCategory').get(controller.getCategory)
router.route('/getSingleCategory/:id').get(controller.getSingleCategory)
router.route("/editCategory/:id").patch(upload.single("categoryImage"),controller.categoryEdit)
router.route('/categoryRemove/:id').delete(controller.deleteCategory)
router.route("/Product/:filename").get(controller.getCategoryFile)

// category


//products 

router.route('/addProducts').post(upload.fields([{name:'thumbnile',maxCount:1},{name:"images"}]),controller.addProduct);
router.route('/getProducts').get(controller.getProducts);
router.route('/productRemove/:id').delete(controller.deleteProduct)
router.route('/singlepeoduct/:id').get(controller.singleProduct)
router.route('/editproduct/:id').patch(upload.fields([{name:'thumbnile',maxCount:1},{name:"images"}]),controller.editProduct)

//products 

// user

router.route('/addUser').post(controller.addUser);
router.route("/userlogin").post(controller.userLogin);
router.route("/forgotUserName/:phone").get(controller.forgotUserName);
router.route("/forgotUserPassword/:phone").patch(controller.foregotUserPassword);
router.route("/userhome").get(Auth,controller.userHome);
router.route('/addtocart/:id').post(controller.addToCart);
router.route('/getcart/:userId').get(controller.getCart);
router.route('/cartitemremove/:id').patch(controller.removeItem);
router.route('/favitems/:id').post(controller.favItems);
router.route('/getfav/:userId').get(controller.getFav);
router.route('/favitemremove/:id').patch(controller.removeFav);
router.route('/cartdecrement/:id').patch(controller.cartdecrement);
router.route('/cartincrement/:id').patch(controller.cartincrement);
router.route('/addAddress/:id').post(controller.addAddress);
router.route('/placeorder').patch(controller.placeOrder);
router.route('/singleorder').patch(controller.singleOrder);

// user

// order

router.route('/getorder').get(controller.getOrder);

// order

export default router;