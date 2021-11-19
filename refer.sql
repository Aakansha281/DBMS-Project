
-- Get persons with more than some years of exprience
select * from person where member_id in 
(
    select member_id from experienced_in as e natural join experience where years_of_exp > 5
);