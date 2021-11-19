drop database resume;
create database resume;
\c resume

create table PERSON(
	member_id serial primary key,
	name varchar(20) not null,
	city varchar(20) not null,
	state varchar(20) not null,
	country varchar(20) not null,
	email varchar(20) not null,
	objective varchar(100),
	imgurl varchar(100),
	isemployed boolean default false
);

create table Good_At(
	member_id serial,
	skill_id serial,
	level_of_expertise varchar(5) not null
	
);

create table Skill(
	skill_id serial primary key, 
	skill_name varchar(20) not null
);

alter table Good_at add constraint pk1 primary key(member_id, skill_id);

alter table Good_at add constraint fk1 foreign key(member_id) references PERSON(member_id);

alter table Good_at add constraint fk2 foreign key(skill_id) references Skill(skill_id);


create table certifications(
	cert_id serial primary key,
	cert_name varchar(20) not null,
	description varchar(100) not null,
	member_id serial not null, 
	foreign key (member_id) references PERSON(member_id)	
);


	

create table accomplishments(
	accomplishment_id serial primary key,
	accomplishment_name varchar(20) not null,
	accomplishment_description varchar(100),
	member_id serial not null,
	foreign key (member_id) references PERSON(member_id)
);


create table social_media(
	member_id serial, 
	linkedIn varchar(255) unique,
	gitHub varchar(255) unique,
	primary key(member_id)
);

create table other_skills(
	member_id serial, 
	other_link varchar(255),
	primary key(member_id, other_link)
);


create table phone_number(
	member_id serial,
	phone varchar(15) not null
);

alter table phone_number add constraint pnpk primary key(member_id, phone);


create table worked_on(
	member_id serial, 
	project_id serial, 
	work_date date
);

create table project(
	project_id serial primary key,
	project_name varchar(20),
	project_description varchar(100)
	
);

alter table worked_on add constraint wpk primary key (member_id, project_id);

alter table worked_on add constraint wfk1 foreign key(member_id) references PERSON(member_id); 

alter table worked_on add constraint wfk2 foreign key(project_id) references project(project_id); 

create table experienced_in(
	member_id serial ,
	experience_id serial
);
create table experience(
	start_date date not null,
	end_date date not null,
	experience_id serial primary key,
	job_id serial
);

alter table experience add column years_of_exp int generated always as (date_part('year', end_date) - date_part('year', start_date)) stored not null;

alter table experienced_in add constraint epk primary key(member_id , experience_id);
alter table experienced_in add constraint efk1 foreign key(member_id) references person(member_id);
alter table experienced_in add constraint efk2 foreign key(experience_id) references experience(experience_id);

create table job(
	job_id serial primary key ,
	company varchar(10) not null,
	title varchar(20) not null,
	description varchar(100) not null,
	location varchar(10) 
);

alter table experience add constraint efk3 foreign key(job_id) references job(job_id);


create table studied_in(
	member_id serial, 
	education_id serial, 
	gpa decimal(3, 1) not null,
	study_year date not null
);

create table education(
	education_id serial primary key,
	course varchar(20) not null,
	location varchar(20) not null
);

alter table studied_in add constraint spk primary key(member_id, education_id);

alter table studied_in add constraint sfk foreign key(education_id) references education(education_id);

alter table studied_in add constraint sfk1 foreign key(member_id) references PERSON(member_id);
create table publications( member_id serial , 
	url varchar(100)  , 
	name varchar(100) not null , 
	description varchar(200) );
alter table publications add constraint pfk1 foreign key(member_id) references person(member_id);
alter table publications add constraint ppk1 primary key(member_id , url);
create table recommendations( url varchar(100) primary key , 
	Name varchar(100) not null, 
	Designation varchar(100) not null, 
	member_id  serial  not null);
alter table recommendations add constraint rfk foreign key(member_id) references person(member_id);
create table author(url varchar(100) not null , 
	member_id serial not null);
alter table author add constraint aufk foreign key(member_id) references person(member_id);
alter table author add constraint aupk primary key(url,member_id);


	 





























