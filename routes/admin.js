var express = require('express');
const { route } = require('./user');
const {render}=require('../app')
const productHelpers=require('../helpers/product-helpers')
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{products,admin:true})
  })


  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')

})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);
  productHelpers.addProduct(req.body,(id)=>{
    let Image=req.files.image
    console.log(id)
    Image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err) {
        res.render('admin/add-product')
      }
      else{
        console.log(err)
      }
    })
    res.render("admin/add-product")
  })

})
module.exports = router;
