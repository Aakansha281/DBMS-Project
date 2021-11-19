const express = require('express')
const app = express()
const pool = require('./dbconnect')
const cors = require('cors')
const path = require("path")
//middleware

app.use(cors())
app.use(express.json())
const static_path = path.join(__dirname,"../public")
//Routes

app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path))
app.set("view engine", "hbs");
app.get("/home",(req,res)=>{
    res.render("index")
})
app.post('/home',  (req, res) => {
    console.log("REQUEST RECEIVED");
        console.log(req.body)
        const a=req.body.n;
        
        pool.query(`insert into person(name,city,state,country,email,objective,imgurl) values('${req.body.n}','Bangalore','KA','India','${req.body.email}','Intern','image url for John Doe')`);
        if(Array.isArray(req.body.contactNumber)){
        for (var i of req.body.contactNumber){
            i=parseInt(i)
            pool.query(`insert into phone_number(phone) values
            ('${i}')`)
        }}
        else{ pool.query(`insert into phone_number(phone) values
        ('${req.body.contactNumber}')`)}
        gpa=parseInt(req.body.gpa)
        studyYear=req.body.studyYear
        pool.query(`insert into education(course, location) values
        ('${req.body.course}', '${req.body.courseLocation}')`)
        //pool.query(`insert into studied_in(gpa,study_year) values
       // ('${gpa}','${studyYear}')`)
      pool.query( `insert into project(Project_name, project_description) values
('${req.body.projectName}', '${req.body.projectDescription}')`)
pool.query(`insert into skill(skill_name) values(
'${req.body.skillName}')`)
pool.query(`insert into certifications(cert_name, Description) values
('${req.body.certName}', '${req.body.cerDesc}')`,(err,res)=>{console.log(err,res)})
pool.query(`
insert into job(company, title, description, location) values
('${req.body.company}', '${req.body.jobName}', '${req.body.jobDesc}', '${req.body.jobLocation}')`,(err,res)=>{console.log(err,res)})
pool.query(`insert into recommendations(url, Name, Designation) values
('${req.body.recommendationLink}', '${req.body.rname}' ,'${req.body.rdesignation}' )`)
pool.query(`insert into publications( url , name, description) values
('${req.body.pLink}', '${req.body.pname}', '${req.body.pDescription}')`)
pool.query(`insert into author(url) values
('${req.body.pLink})`,(err,res)=>{console.log(res)})
pool.query(`
insert into social_media(linkedin,github) values
('${req.body.linkedin}','${req.body.git}')`)
  
  
})
//render the template named 'filter' on get request 
app.get('/',(req,res)=>{
    res.render("filter")
})
//handling post request for custom query e.g. select * from person;
app.post('/f',async(req,res)=>{
    const results = await pool.query(req.body.r)
    var wrapper={objects:results.rows}
    res.render("final",wrapper)
})
//handling post request for filter
app.post('/fff', async (req, res) => {
    
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
        console.log(q)
        const results = await pool.query(q);
        var wrapper={objects:results.rows}
        res.render("final",wrapper)
       
    }
    catch (e) {
        console.error(e);
    }
})

//searching keywords
app.post('/k', async (req, res) => {

    try {console.log(typeof(req.body.keywords))
        keywords = req.body.keywords.split(" ").map((word) => {
            return "'%" + word.toLowerCase() + "%'"
        })

        keywords_normal = req.body.keywords.split(" ").map((word) => {
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
       // res.json(searchResults.rows)
       var wrapper={objects:searchResults.rows}
       res.render("final",wrapper)

    }
    catch (err) {
        console.log(err)
    }
})

app.listen(7000, () => {
    console.log('Server running on localhost 5000')
})