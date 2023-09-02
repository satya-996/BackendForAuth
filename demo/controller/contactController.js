const asyncHandler=require("express-async-handler")
const Contact=require("../model/contactModel")
const getContacts= asyncHandler(async(req, res)=> {
    const contacts= await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
const createContact= asyncHandler(async(req, res)=> {
    console.log("request body is",req.body)
    const {name, email, phnum}=req.body
    if(!name || !email || !phnum) {
        res.status(400)
        throw new Error("all fields aree mandatory")
    }
    const contacts=await Contact.create({
        name, email, phnum, user_id:req.user.id
    })
    res.status(201).json(contacts)
})
const getContact= asyncHandler(async(req, res)=> {
    const contact=await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
})
const updateContact= asyncHandler(async(req, res)=> {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})
const deleteteContact= asyncHandler(async(req, res)=> {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    await Contact.deleteOne({_id:req.params.id})

    res.status(201).json(contact)
})
module.exports={getContacts, createContact, getContact, updateContact, deleteteContact}