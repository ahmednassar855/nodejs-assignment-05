Assignment 5:
*using  sequalize  and express * 
create two tables
user table                                       (name , email , password ,age)
product table                                (pName , pDescription, price, createdby)

-user APIs-
1- add user 
2- update user 
3- delete user
5- search for user where his name start with "a" and age less than 30 => using like for characters
6- search for users by list of ids => using IN
7- get all user 
8- get all users with products

-product APIs-
1- add product
2- delete product (product owner only )
3- update product (product owner only)
4- get all products 
5- search for products where price greater than 3000
Notes:
1-لو بنضيف userو الemailده موجود ف الdatabaseقبل كده يطلع ان الemail exist و ميتعملش add
2-ان يشوف ال id بتاع ال userالي بيتعملو updateاوdelete موجود ولا لا لو مش موجود يظهر not exist 
كل ال data تكون من الpostman مش static
الديدلاين يوم الخميس الساعه7
