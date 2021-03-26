
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
router.post('/class/create',classController.createClass);
router.post('/student/create',studentController.createStudent);

router.post('/student/assignClass',schoolController.assignClasses);
router.get('/school/get',schoolController.getOne);


module.exports = router