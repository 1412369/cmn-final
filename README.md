# cmn-final
#Setup project : cd to CNM-Final
## Phone : "cd phone" => "npm install" => "npm start"
## Locate : "cd locate" => "npm install" => "npm start"
## Driver : "cd driver" => "npm install" => "npm start"
## Point : "cd point" => "npm install" => "npm start"
## Phone : "cd server" => "npm install" => "nodemon" (* nodejs v8 required )
## Phone : "cd socket" => "npm install" => "nodemon" (* nodejs v8 required )
## Database: Mongodb
- User Schema :
{
    "_id" : ObjectId("5a3931f29ee8cc20203e60d2"),
    "email" : "locate@gmail.com",
    "password" : "$2a$10$A3JGEuwCFnBAI.4YTgEKA.jT7sLfOnMyen4HSWiiWMHorZJgPJ8Wi",
    "role" : "locate" || ("driver","phone","point")
    "name" : "Nguyen Van Locate",
    "created_at" : ISODate("2017-12-19T15:36:18.270Z"),
    "online" : false,
    "modified" : ISODate("2017-12-26T18:24:35.392Z")
}
- Locate Schema :
{
    "_id" : ObjectId("5a55cca35127d62da2086c87"),
    "address" : "172 bau cat",
    "type" : "normal",
    "phone" : "012345",
    "note" : null,
    "name" : "ly nhan",
    "created_at" : ISODate("2018-01-10T08:19:47.853Z"),
    "driver" : /* if paired driver vs location*/,
    "locater" : /*who located the address*/,
    "location" : /* updated when geocode success*/,
    "status" : "finish",/* "new","locating","paired","moving","finish" */
    "modified" : ISODate("2018-01-10T08:25:01.435Z")
}
## Front-end : Reactjs
## Design : Reactjs Material Design (https://react-md.mlaursen.com)
