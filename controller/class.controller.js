const School = require("../models/school");
const Class = require("../models/class");
const ObjectId = require("mongoose").Types.ObjectId;
const { to, ReE, ReS, isNull } = require("../services/util.service");
const HttpStatus = require("http-status");

module.exports.createClass = async (req, res) => {
  let className = req.body.className;

  let err, existingClassName, newClass;

  if (isNull(className)) { return ReE( res, { message: "Class Name is Required" }, HttpStatus.BAD_REQUEST )}

  [err, existingClassName] = await to( Class.findOne({ className: className, }));

  if (err) { return ReE(res, { message: "Class Name not Found" }) }
 
  [err, newClass] = await to(Class.create({ className: className, }));

  if (err) { return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR); }

  if (newClass) { return ReS( res, { message: "Class Created Sucessfully", class: newClass }, HttpStatus.OK )}
};


module.exports.createSection = async(req,res) =>{

  let err, existingClassName , newSection

  [err,existingClassName] = await to(Class.findById(req.body.id));

  if(err){ return ReE(res,err,HttpStatus.BAD_REQUEST)};

  if(!existingClassName) {return ReE(res,{message:"className is not exist"},HttpStatus.BAD_REQUEST)}

  let data = { sectionName:req.body.sectionName };

  existingClassName.section.push(data);

  [err,newSection] = await to(existingClassName.save());
  
  if(err){return ReE(res,err,HttpStatus.BAD_REQUEST)}

  return ReS(res,{message:"saved sucessfully", section:newSection},HttpStatus.OK)
}

exports.getAll = async (req, res) => {
  let err, exisistingSection;
  let query = req.query;

  [err, exisistingSection] = await to(
    Class.find({ ...query }).populate({
      path: "schoolName",
      model: "School",
      select: "schoolName",
    })
  );

  if (err) {
    return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  if (!exisistingSection) {
    ReE(res, { message: "Unhandled Error" }, HttpStatus.BAD_REQUEST);
  }

  return ReS(
    res,
    { message: "Section fetched", section: exisistingSection },
    HttpStatus.OK
  );
};
