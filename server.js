import express from 'express';
import router from './router.js';
import customerRouter from './customerRoute.js';

const app = express();

app.get('/', (_, res) => {
    res.json({asdassa: process.env});
});
app.set('etag', (body, encoding) => {
    return 'sdfndsnfds34534pi534,dsmndsbfkadsfkffdasnfkdsfksnfdsnhdfkgh'
});

app.use(router);
app.use(customerRouter);

app.listen(8000, () => {
    console.log('8000 port is running!...');
});