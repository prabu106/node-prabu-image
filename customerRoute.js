import etag from "etag";
import express from "express";

const customerRouter = express();

customerRouter.use('/customer/cart', (req, res, next) => {
    req.customerId = 1213;
    console.log(1);
    next();
});

customerRouter.use((req, res, next) => {
    console.log(2);
    next();
});

customerRouter.get('/customer/:id', (req, res) => {
    const cid = req.params.id;
    ;
    res.send(`${cid} is getting ....`);
});

customerRouter.get('/customer/cart', (req, res) => {
    res.send(`cart info getting ....`);
});

export default customerRouter;