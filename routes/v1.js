
const express = require('express');
const router = express.Router();

const schoolController = require('../controller/school.controller');
const classController = require('../controller/class.controller')
const studentController = require('../controller/student.controller')
//school
router.get('/', (req, res) => {
    res.status(200).json({message:'server is ready to serve you'});
})
router.post('/school/add', schoolController.createSchool);
router.get('/school/get',schoolController.getOne);
router.get('/school/getAll',schoolController.getAll);

//class
router.post('/class/create',classController.createClass);
router.get('/class/getAll',classController.getAll);

//student
router.post('/student/create',studentController.createStudent);
router.post('/student/assignClass',schoolController.assignClasses);
router.post('/section/create',classController.createSection);

module.exports = router