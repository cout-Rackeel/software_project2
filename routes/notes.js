var express = require('express');
var router = express.Router();
var connection = require('../lib/db')

router.get('/edit/:id' , function(req,res,next){
  let editQuery = "SELECT * FROM softwareProj.notes WHERE id = "
  connection.query(editQuery + req.params.id, (err,results) => {

    if (err) throw err.toString();


    var locals = {
      title : 'Proj Notes - Edit Notes',
      stylesheet : '/stylesheets/edit-note.css',
      edit : results[0],
      dateT : new Date(results[0].active_date).toLocaleString()
    }

    res.render('notes/edit-note', locals)
  
  })
})

// router.post('/update/:id', function(req,res,next){
//   let data = {
//       note : req.body.note_info,
//       active_date : req.body.active_date,
//   }

//   let locals = {
//     title : 'Proj Notes - Add Note',
//     stylesheet : '/stylesheets/projects.css',
//   }

//   connection.query(`UPDATE notes SET ? WHERE id = ${req.params.id}`, data , (err,results) => {
//     if(err) throw err;
    
//     res.redirect('/projects/more'+ req.params.id);
//     next();
    
//   })

// })

router.post('/update', function(req, res, next) {
  let sqlQuery = "UPDATE softwareProj.notes SET note ='" + req.body.note_info + 
                                      "', active_date ='" + req.body.active_date + 
                                      "' WHERE id = " + req.body.project_id;

  connection.query(sqlQuery, function(err,rows)     {
    var locals ={
      title : 'proj',
      stylesheet:'/stylesheets/projects.css'
    }

             //req.flash('error', err); 
             res.redirect('/projects/more/'+ req.body.project_id)
           
          });
         
     });

     router.get('/notes-form/:id', function(req,res){
      var locals = {
        title : 'Proj Notes - Add Note',
        stylesheet : '/stylesheets/projects.css',
        params : req.params.id
      }
      res.render('notes/add-note', locals)
    })


    router.post('notes/added' , function(req,res,next){
  let data = {
    note: req.body.note_info,
    active_date: req.body.active_date,
    project_id: req.body.project_id,

  }

  let insertQuery = "INSERT INTO notes SET ?"

  connection.query(insertQuery, data, (err,results)=>{
    if(err)throw err
    console.log(JSONResponse(results));
    res.redirect('/projects/more/'+ req.body.project_id)
    next()
    })
})


module.exports = router;