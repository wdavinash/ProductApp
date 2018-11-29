const express = require('express');
const router = express.Router();
const conn =require('./db');


router.get('/',(req, res, next) => {
    conn.query("SELECT * FROM tbl_order", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            order_list: result
          }
            );
      });
});


router.post('/save',(req, res, next) => {
    
    var order ={
        product_id : req.body.product_id,
        agent : req.body.agent_id,
        lat :   req.body.lat,
        long : req.body.long
    }
     conn.query('INSERT INTO tbl_order (product_id, client_lat, client_log, delev_boy_id) VALUES (?, ?, ?, ?)', [order.product_id,order.lat,order.long,order.agent], function(err,result) {
         if(err) throw err
     });
     conn.query(" SELECT _ord.id,_prod.product_name,_prod.price,_agent.name FROM tbl_order _ord LEFT JOIN tbl_delev_agents  _agent ON _ord.delev_boy_id=_agent.id LEFT JOIN tbl_product  _prod ON _ord.product_id=_prod.id order by _ord.id desc", function (err, result, fields) {
         if (err) throw err;
         res.status(200).json({
             order_list: result
           }
             );
       });
});


router.post('/view',(req, res, next) => {
var order={
    id:req.body.id
}
conn.query("SELECT * FROM tbl_order WHERE id="+order.id, function (err, result, fields) {
    if (err) throw err;
    res.status(200).json({
        order_detail: result
      }
        );
  });
});


router.post('/del',(req, res, next) => {
    var order={
        id:req.body.id
    }
    
    conn.query(" DELETE FROM tbl_order WHERE id="+order.id, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            message: "Deleted Successfully"
          }
            );
      });
});


module.exports = router;