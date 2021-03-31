const  School  = require("../models/school");
const  Class  = require("../models/class");
const ObjectId = require("mongoose").Types.ObjectId;
const { to, ReE, ReS, isNull } = require("../services/util.service");
const HttpStatus = require("http-status");

module.exports.createSchool = async (req, res) => {

  let schoolName = req.body.schoolName;
  let err, existingSchoolName, schoolCompany;

  if (isNull(schoolName)) {
    return ReE(
      res,
      { message: "please enter the School Name" },
      HttpStatus.BAD_REQUEST
    );
  }

  [err, existingSchoolName] = await to(
    School.findOne({ schoolName: schoolName, })
  );

  if (err) {
    return ReE(res, { message: "school already exist" });
  }

  if (existingSchoolName) {
    return ReE(res, { message: "SchoolName already here" },HttpStatus.BAD_REQUEST);
  }
  console.log(schoolCompany);
  [err, schoolCompany] = await to(
    School.create({
      schoolName: schoolName,
      active: true,
    })
  );

  if (err) {
    return ReE(res, { message: "School already Exist" });
  }
  return ReS(
    res,
    { message: "School Added Sucessfully", school: schoolCompany },
    HttpStatus.OK
  );
};

module.exports.assignClasses = async (req, res) => {
  
  let err, exisitingSchool,exisitingClasses,  saveSchool

  [err, exisitingSchool] = await to(School.findById(req.body.id));

  if(err) { return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)  }

  if(!exisitingSchool) { return ReE(res, {message:'School doesn\'t found!, Try again'}, HttpStatus.BAD_REQUEST)}

  [err, exisitingClasses] = await to(Class.find({}, {}));

  if(err) { return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)  }

  if(exisitingClasses.length === 0) { return ReE(res, {message:'Classes doesn\'t found!, Try again'}, HttpStatus.BAD_REQUEST)}

  let claasesIds = [];

  for (let index = 0; index < exisitingClasses.length; index++) {
    const element = exisitingClasses[index];
    claasesIds.push(element._id);
  }

  exisitingSchool.classes = claasesIds;

  [err, saveSchool] = await to(exisitingSchool.save());

  if(err) { return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR) }

  if(!saveSchool) {return ReE(res, {message:'Classes do9esn\'t assig to school.'}, HttpStatus.BAD_REQUEST)}

  return ReS(res, {meesage:'Classes assign sucess', school:exisitingSchool}, HttpStatus.OK)


}

module.exports.getOne = async (req, res) => {

  let err, exisitingSchool;

  [err, exisitingSchool] = await to(School.findById(req.body.id).populate([{
    path:"classes",
    select:["className"],
    model:"Class",
  }]));

  if(err) { return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)  }

  if(!exisitingSchool) { return ReE(res, {message:'School doesn\'t found!, Try again'}, HttpStatus.BAD_REQUEST)}

  return ReS(res, {message:'School Found', school:exisitingSchool}, HttpStatus.OK)
}
