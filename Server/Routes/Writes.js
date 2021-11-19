const express = require('express')
const { RowDescriptionMessage } = require('pg-protocol/dist/messages')
const pool = require('../dbconnect')
const router = express.Router()

//route to toggle isEmployed Field of a person using member_id
router.post('/employ/:id', async (req, res) => {
    try {
        q = `select isemployed from person where member_id = ${req.params.id};`
        let value = await pool.query(q)
        value = value.rows[0].isemployed

        //toggle value
        value = value ? false : true;

        q = `update person set isemployed = ${value} where member_id = ${req.params.id};`
        const r = await pool.query(q)
        res.json(r);

    } catch (e) {
        console.error(e)
    }
})


module.exports = router;