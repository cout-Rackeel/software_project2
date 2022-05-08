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

  let notesQuery = "SELECT pj.project_title, pj.project_description , pj.project_start_dt, pj.project_due_dt , nt.note, nt.active_date , nt.project_id , nt.id  FROM  softwareProj.projects pj , softwareProj.notes nt WHERE nt.project_id = pj.id AND nt.project_id ="

  connection.query( notesQuery + req.params.id , (err,results) => {
    if (err) throw err.toString();


    var locals = {
      title : 'Proj Notes - Show Projects',
      stylesheet : '/stylesheets/projects.css',
      notes : results,
    }


    res.render('projects/projects_more', locals )
  })
})



module.exports = router;
