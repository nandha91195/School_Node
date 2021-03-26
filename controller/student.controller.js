const School  = require("../models/school");
const Class = require("../models/class");
const Student = require("../models/student");
const ObjectId = require("mongoose").Types.ObjectId;
const { to, ReE, ReS, isNull } = require("../services/util.service");
const HttpStatus = require("http-status");

module.exports.createStudent = async (req,res) =>{

    let schoolName = req.body.schoolName;
    let className = req.body.className;
    let studentName = req.body.studentName;

    let err,existingClassName,existingSchoolName,existingStudentName, newStudent

    if(isNull(schoolName)){
        return ReE(res,{message:"scholl name is required"},HttpStatus.BAD_REQUEST)
    };

    if(isNull(className)){
        return ReE(res,{message:"class name is required"},HttpStatus.BAD_REQUEST)
    };

    if(isNull(studentName)){
        return ReE(res,{message:"student name is required"},HttpStatus.BAD_REQUEST)
    };

    [err,existingClassName] = await to(Class.findOne({_id:className}));

    if(err){
        return ReE(res,{message:"Class is not Found"},HttpStatus.BAD_REQUEST)
    };

    [err,existingSchoolName] = await to(School.findOne({_id:schoolName}));

    if(err){
        return ReE(res,{message:"school is not found"},HttpStatus.BAD_REQUEST)
    };

    [err,existingStudentName] = await to(Student.findOne({studentName:studentName}));

    if(err){
        return ReE(res,{message:"school name is not found"})
    };

    [err,newStudent] = await to(Student.create({
        className: existingClassName._id,
        studentName: studentName,
        schoolName: existingSchoolName._id,
    }));

    if(err){
        return ReE(res,{message:"Student Id is required"},HttpStatus.BAD_REQUEST)
    };

    if(newStudent){
        return ReS(res,{message:"student created sucessfully",student:newStudent},HttpStatus.OK)
    };

}