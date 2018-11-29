const express = require('express');
const router = express.Router();
const conn =require('./db');


router.get('/',(req, res, next) => {
    conn.query("SELECT * FROM tbl_delev_agents", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            agents_list: result
          }
            );
      });
    
});

module.exports = router;