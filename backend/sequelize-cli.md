npx sequelize-cli model:generate --name TblUser --attributes username:string,email:string,password:string,image:string,bithday:date

npx sequelize-cli model:generate --name TblPost --attributes content:string,image:string,status:integer,userId:integer

npx sequelize-cli model:generate --name TblDetailUser --attributes fullname:string,address:string,birthday:date,religion:string,nasionality:string,languages:string,description:string,userId:integer

npx sequelize-cli db:migrate