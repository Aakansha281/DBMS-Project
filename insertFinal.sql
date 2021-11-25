\c resume

insert into person(name, city, state, country, email, objective, imgurl) values
('John Doe', 'Bangalore', 'KA', 'India', 'johndoe@gmail.com', 'intern', 'image url for John Doe'),
('J P', 'Chennai', 'TN', 'India', 'jp@gmail.com', 'summer intern', 'image url for J P'),
('Mary', 'New York', 'NY', 'USA', 'mary@gmail.com', 'QA Engineer','image url for Mary'),
('Jane Doe', 'Bangalore', 'KA', 'India', 'janedoe@gmail.com', 'Testing Profile', 'image url for Jane Doe'),
('Reddy', 'Nellore', 'AP', 'India', 'reddy@gmail.com', 'Looking for internships in the field of cybersecurity', 'image url for Reddy'),
('John Doe', 'Lucknow', 'UP', 'India', 'johndoe2@gmail.com' ,'Actively looking for interships in Grpahic designing', 'image url for John Doe'),
('Jack', 'Mysore', 'KA', 'India', 'jack@gmail.com', 'Seeking Web DEveloper Role', 'image url for Jack'),
('David D', 'Moscow', 'Moscow', 'Russia', 'davidd@gmail.com', 'Internship in Game development', 'image url for David D');


insert into phone_number values
(1, 902523862),
(2, 3463732363),
(3, 3463732363),
(4, 34637334363),
(5, 245625735),
(6, 445685685),
(7, 3463763),
(8, 344632363)
;

insert into skill(skill_name) values
('HTML'),
('Javascript'),
('React.js'),
('Python'),
('Football'),
('Singing'),
('Driving'),
('Swimming')
;

insert into certifications(cert_name, Description, member_id) values
('Certification1', 'Description of certification 1',8),
('Certification2', 'Description of certification 2',7),
('Certification3', 'Description of certification 3',8),
('Certification4', 'Description of certification 4',5),
('Certification5', 'Description of certification 5',4),
('Certification6', 'Description of certification 6',3),
('Certification7', 'Description of certification 7',2),
('Certification8', 'Description of certification 8',1)
;

insert into accomplishments(accomplishment_name, accomplishment_description, member_id) values
('accomplishment 1', 'Description of accomplishment 1',1),
('accomplishment 2', 'Description of accomplishment 2', 2),
('accomplishment 3', 'Description of accomplishment 3', 1),
('accomplishment 4', 'Description of accomplishment 4', 3),
('accomplishment 5', 'Description of accomplishment 5',5),
('accomplishment 6', 'Description of accomplishment 6',7),
('accomplishment 7', 'Description of accomplishment 7',4),
('accomplishment 8', 'Description of accomplishment 8',4)
;

insert into project(Project_name, project_description) values
('project 1', 'Description of project 1'),
('project 2', 'Description of project 2'),
('project 3', 'Description of project 3'),
('project 4', 'Description of project 4'),
('project 5', 'Description of project 5'),
('project 6', 'Description of project 6'),
('project 7', 'Description of project 7'),
('project 8', 'Description of project 8')
;

insert into job(company, title, description, location) values
('comp 1', 'job title 1', 'job description 1', 'location 1'),
('comp 2', 'job title 2', 'job description 2', 'location 2'),
('comp 3', 'job title 3', 'job description 3', 'location 3'),
('comp 4', 'job title 4', 'job description 4', 'location 4'),
('comp 5', 'job title 5', 'job description 5', 'location 5'),
('comp 6', 'job title 6', 'job description 6', 'location 6'),
('comp 7', 'job title 7', 'job description 7', 'location 7'),
('comp 8', 'job title 8', 'job description 8', 'location 8')
;

insert into education(course, location) values
('education 1', 'eduloc 1'),
('education 2', 'eduloc 2'),
('education 3', 'eduloc 3'),
('education 4', 'eduloc 4'),
('education 5', 'eduloc 5'),
('education 6', 'eduloc 6'),
('education 7', 'eduloc 7'),
('education 8', 'eduloc 8')
;

insert into Good_at(member_id, skill_id, level_of_expertise) values
(1, 2, '4'),
(1, 3, '5'),
(2, 3, '4'),
(6, 2, '2'),
(4, 4, '5'),
(2, 4, '5'),
(6, 8, '4'),
(8, 4, '3')
;

insert into other_skills values
(1, 'linkedIn.com'),
(7, 'pesuacademy.com/achievements'),
(2, 'blogger.com'),
(9, 'abc.com'),
(4, 'coreldraw.com'),
(8, 'blender.org'),
(3, 'def.com'),
(5, 'mpf.com');

insert into social_media values
(1, 'linkedIn.com/asdfasdf', 'github.com/fgdfjd'),
(4, 'linkedIn.com/ahytasdf', 'github.com/fgbwhtfjd'),
(6, 'linkedIn.com/asd245sdf', 'github.com/fg456jd'),
(8, 'linkedIn.com/1346fasdf', 'github.com/fgdzdgafjd'),
(5, 'linkedIn.com/1346fa456df', 'github.com/sdflgkj234524')
;

insert into studied_in values
(1, 1, 9.3, '10-01-1976'),
(2, 1, 9.4, '10-05-1976'),
(6, 3, 5.5, '08-01-1976'),
(8, 2, 9.4, '10-01-1986'),
(7, 6, 9.3, '08-02-1996'),
(1, 6, 9.3, '11-12-1997')
;

insert into experience values
('01-02-1976', '02-03-1978', 4, 7),
('05-02-1978', '02-03-1980', 6, 6),
('01-02-1980', '02-03-1990', 2, 4),
('01-02-1960', '02-03-1978', 5, 8),
('01-02-1967', '02-03-1978', 7, 1),
('01-02-1945', '02-03-1978', 1, 2),
('01-02-1947', '02-03-1978', 3, 3),
('01-02-1977', '02-03-1978', 8, 5)
;

insert into experienced_in values
(1, 1),
(3, 4),
(2, 2),
(5, 6),
(4, 4),
(6, 6),
(7, 8),
(8, 6)
;

insert into worked_on values
(2, 3, '10-02-1996'),
(7, 8, '10-05-1993'),
(4, 1, '10-07-1996'),
(8, 3, '10-02-1991'),
(6, 4, '10-03-1993'),
(3, 1, '10-08-1997'),
(1, 1, '10-06-1999'),
(1, 3, '10-09-1991')
;

insert into accomplishments values
(101, 'Accomplishment101','accm. descp. 101', 1),
(102, 'Accomplishment102','accm. descp. 102', 2),
(103, 'Accomplishment103','accm. descp. 103', 3),
(104, 'Accomplishment104','accm. descp. 104', 4),
(105, 'Accomplishment105','accm. descp. 105', 2),
(106, 'Accomplishment106','accm. descp. 106', 1),
(107, 'Accomplishment107','accm. descp. 107', 2),
(108, 'Accomplishment108','accm. descp. 108', 4)
;
 insert into publications(member_id , url , name, description) values
 (1,'https://arxiv.org/abs/2110.02816', 'Publication 1 Title', 'Publication 1 Description'),
 (1,'https://arxiv.org/abs/2110.02817', 'Publication 2 Title', 'Publication 2 Description'), 
 (2,'https://arxiv.org/abs/2110.02818', 'Publication 3 Title', 'Publication 3 Description'), 
 (3,'https://arxiv.org/abs/2110.02819', 'Publication 4 Title', 'Publication 4 Description'), 
 (4,'https://arxiv.org/abs/2110.02820', 'Publication 5 Title', 'Publication 5 Description'),
 (3,'https://arxiv.org/abs/2110.02821', 'Publication 6 Title', 'Publication 6 Description'), 
 (6,'https://arxiv.org/abs/2110.02816', 'Publication 7 Title', 'Publication 7 Description'), 
 (7,'https://arxiv.org/abs/2110.02813', 'Publication 8 Title', 'Publication 8  Description');
insert into recommendations(url, Name, Designation, member_id ) values
('link 1', 'Name of recommender 1' ,'Designation of recommender 1' , 1),
('link 2', 'Name of recommender 2' ,'Designation of recommender 2' , 1) , 
('link 3', 'Name of recommender 3' ,'Designation of recommender 3' , 2),
('link 4', 'Name of recommender 4' ,'Designation of recommender 4' , 3),
('link 5', 'Name of recommender 5' ,'Designation of recommender 5' , 4), 
('link 6', 'Name of recommender 6' ,'Designation of recommender 6' , 4), 
('link 7', 'Name of recommender 7' ,'Designation of recommender 7' , 4), 
('link 8', 'Name of recommender 8' ,'Designation of recommender 8' , 3);
insert into author(url,member_id) values
('https://arxiv.org/abs/2110.02816',1),
('https://arxiv.org/abs/2110.02817',1),
('https://arxiv.org/abs/2110.02818',2),
('https://arxiv.org/abs/2110.02819',3),
('https://arxiv.org/abs/2110.02816',4),
('https://arxiv.org/abs/2110.02816',7),
('https://arxiv.org/abs/2110.02819',8),
('https://arxiv.org/abs/2110.02814',8);