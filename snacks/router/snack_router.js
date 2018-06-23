const express = require('express');
const router = express.Router();
const snacks = require('../model/snacks');

router.get('/snacks', showSnackList);
router.get('/snacks/:snackId', showSnackDetail);
router.post('/snacks', addSnack);
router.delete('/snacks/:snackId', deleteSnackDetail);

module.exports = router;

function showSnackList(req, res) {
    const snackList = snacks.getSnackList();
    const result = { total:snackList.length, data:snackList };
    res.send(result);
}

async function showSnackDetail(req, res) {
    try {
        const snackId = req.params.snackId;
        console.log('snackId : ', snackId);
        const info = await snacks.getSnackDetail(snackId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function addSnack(req, res) {
    const name = req.body.name;

    if (!name) {
        res.status(400).send({error:'name 누락'});
        return;
    }

    const brand = req.body.brand;
    const weight = req.body.weight;
    const kcal = req.body.kcal;

    try {
        const result = await snacks.addSnack(name, brand, weight, kcal);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deleteSnackDetail(req, res) {
    const snackId = req.params.snackId;
    console.log('snackId : ', snackId);
    await snacks.deleteSnackDetail(snackId);
    res.send('success');
}