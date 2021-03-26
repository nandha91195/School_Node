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
