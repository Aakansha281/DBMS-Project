const express = require('express')
const { RowDescriptionMessage } = require('pg-protocol/dist/messages')
const pool = require('../dbconnect')
const router = express.Router()

//General keyword search - searches through the persons':
// Name, Objective, 

//Example url for get:
//localhost:5000/india john swimming

router.get('/:keywords', async (req, res) => {

    try {console.log("check")
        keywords = req.params.keywords.split(" ").map((word) => {
            return "'%" + word.toLowerCase() + "%'"
        })

        keywords_normal = req.params.keywords.split(" ").map((word) => {
            return "'" + word.toLowerCase() + "'"
        })

        const q = `select * from person 
            where lower(name) like any (array [${keywords}]) or
            lower(objective) like any (array [${keywords}]) or 
            lower(state) like any (array [${keywords}]) or
            lower(country) like any (array [${keywords}]) or
            lower(city) like any (array [${keywords}]) or
            member_id in (
                select distinct member_id from good_at join skill on good_at.skill_id = skill.skill_id 
                where lower(skill_name) in (
                    select * from (select distinct lower(skill_name) as sn 
                    from good_at join skill on good_at.skill_id = skill.skill_id) as foo 
                    where sn in (${keywords_normal})
                )
            );
            `
        const searchResults = await pool.query(q)
        res.json(searchResults.rows)

    }
    catch (err) {
        console.log(err)
    }
})

//To let the user type a custom sql query
// request body example
// {
//     "q" : "<custom query here>"
// }

router.post('/q', async (req, res) => {
    try {
        const results = await pool.query(req.body.q)
        res.json(results.rows)
    } catch (err) {
        console.error(err)
    }
})

// possible criteria for filter:
// --> years of experience
// --> city, country, state
// --> skills
// --> education
// --> GPA, year of study
// --> isEmployed or not employed

// structure of the body in post request:
// {
//     city, state, country, years_of_experience, course, study_year, gpa, isEmployed
// }
// if any filter not mentioned, it can be made null, or empty String

router.post('/filter', async (req, res) => {
    try {

        var and_flag = false;

        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const years_of_experience = req.body.years_of_experience;
        const course = req.body.course;
        const study_year = req.body.study_year;
        const gpa = req.body.gpa;
        const isEmployed = req.body.isEmployed;
        const skills = req.body.skills;

        skills_keywords = skills.split(" ").map((word) => {
            return "'" + word.toLowerCase() + "'"
        })

        var q = `select * from person where `

        if (city) {
            if (and_flag == true) q += 'and '
            q += `city = '${city}' `
            if (and_flag == false) and_flag = true;
        }
        if (state) {
            if (and_flag == true) q += 'and '
            q += `state = '${state}' `
            if (and_flag == false) and_flag = true;

        }
        if (country) {
            if (and_flag == true) q += 'and '
            q += `country = '${country}' `
            if (and_flag == false) and_flag = true;
        }
        if (years_of_experience) {
            if (and_flag == true) q += 'and '
            q += `member_id in (select member_id from experienced_in as e natural join experience where years_of_exp >= ${years_of_experience}) `

            if (and_flag == false) and_flag = true;
        }
        if (gpa) {
            if (and_flag == true) q += 'and '
            q += `member_id in (select member_id from education natural join studied_in where gpa > ${gpa}) `
            if (and_flag == false) and_flag = true;
        }
        if (course) {
            if (and_flag == true) q += 'and '
            q += `member_id in (select member_id from education natural join studied_in where course = '${course}') `
            if (and_flag == false) and_flag = true;
        }
        if (study_year) {
            if (and_flag == true) q += 'and '
            q += `member_id in (select member_id from education natural join studied_in where study_year >= '${study_year}') `
            if (and_flag == false) and_flag = true;
        }
        if (isEmployed) {
            if (and_flag == true) q += 'and '
            q += `isemployed = ${isEmployed} `
            if (and_flag == false) and_flag = true;
        }
        if (skills) {
            if (and_flag == true) q += 'and '
            q += `member_id in (
                select distinct member_id from good_at join skill on good_at.skill_id = skill.skill_id 
                where lower(skill_name) in (
                    select * from (select distinct lower(skill_name) as sn 
                    from good_at join skill on good_at.skill_id = skill.skill_id) as foo 
                    where sn in (${skills_keywords})
                )
            ) `
            if (and_flag == false) and_flag = true;
        }
        q += ';'
        const results = await pool.query(q);
        res.json(results.rows)
    }
    catch (e) {
        console.error(e);
    }
})


module.exports = router;