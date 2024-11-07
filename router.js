import express from 'express';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

const router = express.Router();

const middleware = (req, res, next) => {
    next();
}

router.use(middleware);

router.get('/', (_, res) => {
    res.send('home route');
});

router.get('/user', (_, res) => {
    res.send('user route');
});

router.get('/customer-route', (_, res) => {
    res.send('customer route');
});

router.get('/permutate', (_, res) => {
    const permutator = (inputArr) => {
        let result = [];
        const permute = (arr, m = [], i = -1) => {
            console.log(arr, '<===>', m, '<===>', i);
            if (arr.length === 0) {
                result.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next), i);
                }
            }
        }
        permute(inputArr);
        return result;
    }

    res.send(permutator([1, 2, 3]));
});

router.use((err, req, res, next) => {
    if (err) {
        res.send(err.message);
    }
    next();
});

const uri = process.env.ME_CONFIG_MONGODB_URL ?? "mongodb://localhost:27017";

const client = new MongoClient(uri);

router.get('/mongoDB', async (_, res) => {
    try {
        await client.connect();
        const database = client.db('testDB');
        const users = database.collection('users');
        const userList = await users.find({}).toArray();
        res.send(`MongoDB Database Records....${JSON.stringify(userList)}`);
    } catch (err) {
        res.status(500).send('Error Occured' + err.message);
    }
});

const redisClient = createClient({
    url: "redis://redis-cache:6379",
});
redisClient.on('error', err => console.log('Redis Client Error', err));

router.get('/redis', async (_, res) => {
    try {
        await redisClient.connect();
        await redisClient.set('key', new Date().getTime());
        const value = await redisClient.get('key');
        await redisClient.disconnect();
        res.send(`redis Database Records....${JSON.stringify(value)}`);
    } catch (err) {
        res.status(500).send('Error Occured' + err.message);
    }
});

export default router;