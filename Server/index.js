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
app.post('/home',  async(req, res) => {
    console.log("REQUEST RECEIVED");
        console.log(req.body)
        const a=req.body.n;
        
        
        person_details = await pool.query(`insert into person(name,city,state,country,email,objective,imgurl) values('${req.body.n}','${req.body.city}','${req.body.state}','${req.body.country}','${req.body.email}','${req.body.objective}','image url for John Doe') RETURNING *`);
        const current_member_id = person_details.rows[0].member_id
            
       
    if(Array.isArray(req.body.contactNumber)){
        for (var i of req.body.contactNumber){
            i=parseInt(i)
            pool.query(`insert into phone_number(member_id,phone) values
            ('${current_member_id}','${i}')`,(err,res)=>{console.log(err,`insert into phone_number(member_id,phone) values
            ('${current_member_id}','${i}')`)})
        }}
        else{ pool.query(`insert into phone_number(member_id,phone) values
        ('${current_member_id}','${req.body.contactNumber}')`,(err,res)=>{console.log(err,`insert into phone_number(member_id,phone) values
        ('${current_member_id}','${req.body.contactNumber}')`)})}
       
        /*pool.query(`insert into education(course, location) values
        ('${req.body.course}', '${req.body.courseLocation}')`)*/
        //pool.query(`insert into studied_in(gpa,study_year) values
       // ('${gpa}','${studyYear}')`)
       var g=req.body.recommendationLink
var h=req.body.courseName
var j=req.body.courseLocation
var gpa=req.body.gpa
var st=req.body.eduDate
if(Array.isArray(h)){
    for(let i=0;i<h.length;i++)
    {   gpa[i]=parseFloat(gpa[i])
        eduDetails = await pool.query(`insert into education(course, location) values
        ('${h[i]}', '${j[i]}') RETURNING *`)
        console.log(`insert into education(course, location) values
        ('${h[i]}', '${j[i]}') RETURNING *`)
        eduId= eduDetails.rows[0].education_id
        console.log(`eduId ${eduId}`)
        pool.query(`insert into studied_in values
        ('${current_member_id}', '${eduId}','${gpa[i]}', '${st[i]}')`)
        console.log(`insert into studied_in values
        ('${current_member_id}', '${eduId}','${gpa[i]}', '${st[i]}')`)
    }
   }
    else{    console.log(`insert into education(course, location) values
    ('${req.body.courseName}', '${req.body.courseLocation}')`)
        eduDetails = await pool.query(`insert into education(course, location) values
    ('${req.body.courseName}', '${req.body.courseLocation}') RETURNING *`)
    eduId= eduDetails.rows[0].education_id
    console.log(`eduId ${eduId}`)
  
   
    gpa[i]=parseFloat(gpa[i])
    console.log(`insert into studied_in values
    ('${current_member_id}', '${eduId}','${req.body.gpa}', '${req.body.eduDate}')`)
    pool.query(`insert into studied_in values
        ('${current_member_id}', '${eduId}','${req.body.gpa}', '${req.body.eduDate}')`)

}

   /*   pool.query( `insert into project(Project_name, project_description) values
('${req.body.projectName}', '${req.body.projectDescription}')`)*/
var u=req.body.projectName
 var v=req.body.projectDescription
 var w=req.body.workDate
 console.log(u)
if(Array.isArray(u)){
    for(let i=0;i<u.length;i++)
    {   console.log("*****")
        
        project_details =await  pool.query(`insert into project(Project_name, project_description) values
        ('${u[i]}', '${v[i]}') RETURNING *`)
        console.log(`insert into project(Project_name, project_description) values
    ('${u[i]}', '${v[i]}')`)
        p_id= project_details.rows[0].project_id
        console.log(`p_id${p_id}`)
        
        pool.query(`
        insert into worked_on values
        ('${current_member_id}', '${p_id}', '${w[i]}')`)

        console.log(`
        insert into worked_on values
        ('${current_member_id}', '${p_id}', '${w[i]}')`)
    }
}
    else{console.log("%%%")
        project_details = await  pool.query(`insert into project(Project_name, project_description) values
    ('${req.body.projectName}', '${req.body.projectDescription}') RETURNING *`)
    p_id= project_details.rows[0].project_id
    console.log(`p_id${p_id}`)
    console.log(`
    insert into worked_on values
    (${current_member_id}, ${p_id}, ${req.body.workDate})`)
    pool.query(`
        insert into worked_on values
        ('${current_member_id}', '${p_id}', '${req.body.workDate}')`)
}
console.log("%%%")
 u=req.body.accName
 v=req.body.accDesc
if(Array.isArray(req.body.accName)){
    for(let i=0;i<u.length;i++)
    {
        pool.query(`insert into accomplishments(member_id,accomplishment_name, accomplishment_description) values
        ('${current_member_id}','${u[i]}', '${v[i]}')`,(err,res)=>{console.log(err,`insert into accomplishments(member_id,accomplishment_name, accomplishment_description) values
            ('${u[i]}', '${v[i]}')`)})
    }
   }
    else{ pool.query(`insert into accomplishments(member_id,accomplishment_name, accomplishment_description) values
    ('${current_member_id}','${req.body.accName}', '${req.body.accDesc}')`) 
    console.log("%%%")
}
var sk=req.body.skillName;
var loe=req.body.levelOfExpertise;
if(Array.isArray(req.body.skillName)){
    for(let i=0;i<sk.length;i++){
        skill_details = await pool.query(`insert into skill(skill_name) values(
            '${sk[i]}') RETURNING *`)
            current_skill_id = skill_details.rows[0].skill_id
            pool.query(`insert into Good_at(member_id, skill_id, level_of_expertise) values
            ('${current_member_id}',  '${current_skill_id}' ,${loe[i]})`)
    }
}else{skill_details = await pool.query(`insert into skill(skill_name) values(
    '${req.body.skillName}') RETURNING *`)
    current_skill_id = skill_details.rows[0].skill_id
    pool.query(`insert into Good_at(member_id, skill_id, level_of_expertise) values
    ('${current_member_id}', '${current_skill_id}', '${req.body.levelOfExpertise}')`)
    
}
var arr1=req.body.certName
var arr2=req.body.certDesc
if(Array.isArray(req.body.certName)){
    for(let i=0;i<arr1.length;i++)
    {
        pool.query(`insert into certifications(member_id,cert_name, Description) values
    ('${current_member_id}',${arr1[i]}', '${arr2[i]}')`,(err,res)=>{console.log(err,res)})
    }
   }
    else{ pool.query(`insert into certifications(member_id,cert_name, Description) values
    ('${current_member_id}','${req.body.certName}', '${req.body.cerDesc}')`,(err,res)=>{console.log(err,res)})}
/*pool.query(`
insert into job(company, title, description, location) values
('${req.body.company}', '${req.body.jobName}', '${req.body.jobDesc}', '${req.body.jobLocation}')`)*/
/*if(req.body.recommendationLink){
pool.query(`insert into recommendations(url, Name, Designation) values
('${req.body.recommendationLink}', '${req.body.rname}' ,'${req.body.rdesignation}' )`)}*/
var b1=req.body.jobName
var b2=req.body.jobDesc
var b3=req.body.jobLocation
var b4=req.body.company
var b5=req.body.stDate
var b6=req.body.enDate
if(Array.isArray(b1)){
    for(let i=0;i<b1.length;i++)
    {
        j_details =await pool.query(`
        insert into job(company, title, description, location) values
        ('${b4[i]}', '${b1[i]}', '${b2[i]}', '${b3[i]}') RETURNING *`)
        j_id = j_details.rows[0].job_id
        e_details = await pool.query(`insert into experience(start_date,end_date,job_id) values
        ('${b5[i]}', '${b6[i]}', ' ${j_id}') RETURNING *`,(err,res)=>{console.log(`insert into experience(start_date,end_date,job_id) values
        ('${b5[i]}', '${b6[i]}',  ${j_id})`)})
        e_id=e_details.rows[0].experience_id
        pool.query(`insert into experienced_in values
        ( ${current_member_id}, ${e_id})`,(err,res)=>{console.log(`insert into experienced_in values
        ( ${current_member_id}, ${e_id})`)})
    }
   }
    else{
    j_details = await pool.query(`
    insert into job(company, title, description, location) values
    ('${req.body.company}', '${req.body.jobName}', '${req.body.jobDesc}', '${req.body.jobLocation}') RETURNING *`)
    console.log(j_details)
    j_id = j_details.rows[0].job_id
    console.log(`jid ${j_id}`)
    console.log('*')
    console.log(`insert into experience(start_date,end_date,job_id) values
    ('${req.body.stDate}', '${req.body.enDate}',  ${j_id})`)
    console.log('**')
    
      
        e_details = await pool.query(`insert into experience(start_date,end_date,job_id) values
        ('${req.body.stDate}', '${req.body.enDate}', ' ${j_id}') RETURNING *`)
          
        e_id=e_details.rows[0].experience_id
        console.log(`eid ${e_id}`)
        pool.query(`insert into experienced_in values
        ( ${current_member_id}, ${e_id})`)

}console.log('***')
if(req.body.recommendationLink){
    var a1=req.body.recommendationLink
var a2=req.body.rname
var a3=req.body.rdesignation
if(Array.isArray(a1)){
    for(let i=0;i<a1.length;i++)
    {
        pool.query(`insert into recommendations(member_id,url, Name, Designation) values
        ('${current_member_id}','${a1[i]}', '${a2[i]}' ,'${a3[i]}' )`,(err,res)=>{console.log(err,`insert into recommendations(member_id,url, Name, Designation) values
        ('${current_member_id}','${a1[i]}', '${a2[i]}' ,'${a3[i]}' )`)})
    }
   }
    else{ pool.query(`insert into recommendations(member_id,url, Name, Designation) values
    ('${current_member_id}','${req.body.recommendationLink}', '${req.body.rname}' ,'${req.body.rdesignation}' )`,(err,res)=>{console.log(err,`insert into recommendations(member_id,url, Name, Designation) values
    ('${current_member_id}','${req.body.recommendationLink}', '${req.body.rname}' ,'${req.body.rdesignation}' )`)})}
}

if(req.body.pLink){
    a1=req.body.pLink
 a2=req.body.pname
a3=req.body.pDescription
if(Array.isArray(a1)){
    for(let i=0;i<a1.length;i++)
    {
        pool.query(`insert into publications( member_id,url , name, description) values
        ('${current_member_id}','${a1[i]}', '${a2[i]}', '${a3[i]}')`)}
    }
       else{ pool.query(`insert into publications(member_id, url , name, description) values
    ('${current_member_id}','${req.body.pLink}', '${req.body.pname}', '${req.body.pDescription}')`)}}

//pool.query(`insert into author(member_id,url) values
//('${current_member_id}','${req.body.pLink})`)

a1=req.body.linkedin
a2=req.body.git
a3=req.body.others
console.log("reached1")
if(Array.isArray(a1)){console.log("reached2")
    for(let i=0;i<a1.length;i++){
if(a1[i]){
pool.query(`
insert into social_media(member_id,linkedin,github) values
('${current_member_id}','${a1[i]}','${a2[i]}')` ) 
console.log(`insert into social_media(member_id,linkedin,github) values
('${current_member_id}','${a1[i]}','${a2[i]}')`)

pool.query(`
insert into other_skills(member_id,other_link) values
('${current_member_id}','${a3[i]}')` ) 
console.log(`insert into other_skills(member_id,other_link) values
('${current_member_id}','${a3[i]}')`)}
}}
else{if(req.body.linkedin){
    pool.query(`
    insert into social_media(member_id,linkedin,github) values
    ('${current_member_id}','${req.body.linkedin}','${req.body.git}')` ) 
    console.log(`insert into social_media(member_id,linkedin,github) values
    ('${current_member_id}','${req.body.linkedin}','${req.body.git}')`)
    pool.query(`
    insert into other_skills(member_id,other_link) values
    ('${current_member_id}','${req.body.others}')` ) 
    console.log(`insert into other_skills(member_id,other_link) values
    ('${current_member_id}','${req.body.others}')`)}}
    

  
  
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
    console.log('Server running on localhost 7000')
})