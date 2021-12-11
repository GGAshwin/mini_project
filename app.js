const express=require("express")
app=express()
const sqlite3 = require("sqlite3").verbose();

app.set('view engine','ejs')
const db=new sqlite3.Database('./test.db',err=>{
  if(err){
    console.log(err)
  }
  console.log("connected")
})

const sql_create=`create table if not exists student(
s_id int,
s_name varchar(20),
address varchar(20),
primary key(s_id)
);`

db.run(sql_create,err=>{
  if(err){
    console.log(err)
  }
  console.log("student table created")
})

const insert_into=`insert into student (s_id,s_name,address) values
(1,'ashwin','mangalore'),
(2,'kini','mangalore'),
(3,'adi','mangalore');`

/*db.run(insert_into,err=>{
  if(err){
    console.log(err)
  }
})*/

app.get('/db',async(req,res)=>{
  await db.all("select * from student ",(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(rows)
     // var obj={name:rows}
    res.render("db",{name:rows})
    }
    })
})

app.get('/select',(req,res)=>{
  res.render('select')
})

app.get('/',(req,res)=>{
  console.log('connected to server')
  res.render("index")
})
app.listen("3000")