var express = require('express');
var router = express.Router();
var connection = require('../lib/db')

/* GET Students listing. */
router.get('/', function(req, res, next) {
 
  connection.query('SELECT * FROM softwareProj.projects ' ,  (err,results) =>{
    if (err) throw err.toString()

    var locals = {
      title : 'Proj Notes - Show Projects',
      stylesheet : '/stylesheets/projects.css',
      results : results
    }

    res.render('projects/index',locals)
  })

});

router.get('/more/:id' , function(req, res, next) {

  let notesQuery = "SELECT pj.project_title, pj.project_description , pj.project_start_dt, pj.project_due_dt , pj.id, nt.note, nt.active_date , nt.project_id , nt.id  FROM  softwareProj.projects pj , softwareProj.notes nt WHERE nt.project_id = pj.id AND nt.project_id ="

  connection.query( notesQuery + req.params.id , (err,results) => {
    if (err) throw err.toString();


    var locals = {
      title : 'Proj Notes - Show Projects',
      stylesheet : '/stylesheets/projects.css',
      notes : results,
      params : req.params.id
    }


    res.render('projects/projects_more', locals )
  })
})

router.get('/project-forms', function(req,res,next){
  var locals = {
    title : 'Proj Notes - Add Project',
    stylesheet : '/stylesheets/projects.css'
  }
  res.render('projects/add_project', locals)
})


router.post('/project-forms/add' , function(req,res,next){
  let data = {
    project_title: req.body.project_title,
    project_description: req.body.project_description,
    project_start_dt: req.body.start_dt,
    project_due_dt: req.body.due_dt
  }

  let insertQuery = "INSERT INTO projects SET ?"

  connection.query(insertQuery, data, (err,results)=>{
    if(err)throw err
    console.log(JSONResponse(results));
    res.redirect('/projects')
    next()
    })
})


function JSONResponse(results, err_code=200, err_msg='null'){
  return JSON.stringify({"status_code": err_code, "error": err_msg, "message": results});
}

module.exports = router;
