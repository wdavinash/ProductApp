const express = require('express');
const conn =require('./db');
const router = express.Router();
conn.connect();

router.get('/',(req, res, next) => {
        conn.query("SELECT * FROM tbl_product", function (err, result, fields) {
          if (err) throw err;
          res.status(200).json({
              product_list: result
            }
              );
        });

    

    //we can get product list from data base..
});

router.post('/:product_id',(req, res, next) => {
// get product By Id
localStorage.setItem('data','12345566');
res.status(200).json({
    data : localStorage.get('data')
});
});

router.patch('/',(req, res, next) => {
//Update Product 


});

router.delete('/',(req, res, next) => {
//delete Product 

});


module.exports = router;
