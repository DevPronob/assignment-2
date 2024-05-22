# how to run the application locally

Firstly you have first to clone your repo
git clone https://github.com/DevPronob/assignment-2.git

then when the repository has been cloned
cd assignment-2

and then open the vs code with this file.then you have to see where .env(prossess.env.--) is used .create a .env file in the root.then go to  mongodb site.collect the mongodb url and paste it in the .env file with a proper name 
nad aslo add the port number with name in the .env file .then go to the config >index.ts file . add .env file names in index.ts like 
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
process.env.YOUR .ENV FILE PORT
process.env.YOUR .ENV FILE DATABASE URL
that. after adding that go to the server.ts file and see all the configeration is correct or not.
then add the commend 
npm run start:dev
if then 
Example app listening on port 5000
this messaage is coming in the console then every thing is ok 

then you can use the application locally .

