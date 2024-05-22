# how to run the application locally

Firstly you have first to clone your repo  
git clone https://github.com/DevPronob/assignment-2.git

then when the repository has been cloned  
cd assignment-2

and then open the vs code with this file.
 Then you have to see where `.env` (process.env.--) is used. Create a `.env` file in the root.  
Then go to the MongoDB site, collect the MongoDB URL, 
and paste it in the `.env` file with a proper name. Also, 
add the port number with a name in the `.env` file.  
Then go to the `config/index.ts` file. Add `.env` file names in `index.ts` like:

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};


