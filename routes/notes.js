var express = require('express');
var router = express.Router();
var connection = require('../lib/db')
var moreLocator;

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

  connection.query(sqlQuery, function(err,rows)   {

      if(err){
        req.flash('error', err); 
      }else{
    var locals ={
      title : 'proj',
      stylesheet:'/stylesheets/projects.css'
    }
             req.flash('success', "Sucessfully updated"); 
             res.redirect('/projects/more/'+ req.body.project_id)
           
  }
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


    router.post('/add' , function(req,res,next){
  let data = {
    note: req.body.note_info,
    active_date: req.body.active_date,
    project_id: req.body.project_id,

  }

  let insertQuery = "INSERT INTO notes SET ?"

  connection.query(insertQuery, data, (err,results)=>{
    if(err){
      console.log(err);
    }else{
    res.redirect('/projects/more/' + req.body.project_id)
    next()
    }
    
    })
})

router.get('/notes/delete/:id', function(req,res){
  res.render('notes/delete',{title:'Proj Notes - Delete note', stylesheet:''})
})

router.get('/delete/:id', function(req,res,next){
  var deleteQuery = "DELETE FROM notes WHERE id = "
  var locals;
  var sumQuery = "SELECT pj.id, nt.project_id , nt.id  FROM  softwareProj.projects pj , softwareProj.notes nt WHERE nt.project_id = pj.id AND nt.id = '"+ req.params.id+"'"

  connection.query(sumQuery , (err,rows)=>{
    return locals = {
      location: rows[0].project_id
    }
  })


  connection.query(deleteQuery + req.params.id ,(err,results) =>{
    if(err){
      req.flash('error', err);
      console.log(err);
      res.redirect('/projects/more/'+ locals.location)
    }
    
      req.flash('success','Successfully Deleted')
      res.redirect('/projects/more/'+ locals.location)
      console.log(locals)
      next()
    
  })
  
})




module.exports = router;