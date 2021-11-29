const express = require('express');

const mongoose = require('mongoose');

const connect = ()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/evaluation1")
}

const companySchema = new mongoose.Schema({
    name:{type:String, required:true},
    companyType:{type:String, required:true},
    vacany:{type:Number, required:true},
    location:{type:String, required:true},
    jobtype:{type:String, required:false, default:"Remote work"},
},
{
    timestamps:true,
    versionKey:false,
})

const companyDetail = mongoose.model('company',companySchema)



const jobSchema = new mongoose.Schema({
    Jobtype:{type:String, required:true},
    Rating:{type:Number, required:true},
    noticePeriod:{type:String, required:true},
    skillrequired:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"skills",
      required:true,
    }],
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"companyDetails",
        required:true,
    }
    
},
{
    versionKey:false,
    timestamps:true,
})

const jobs = mongoose.model('job',jobSchema)


const skillSchema = new mongoose.Schema({
    skill: {type:String, required:true}
},{
    versionKey:false,
    timestamps:true,
})

const skills = mongoose.model('skill',skillSchema)

const app = express();

app.use(express.json())

// company ----------------------------------------------------------------

app.get("/company",async (req, res) => {
    try{
        const company = await companyDetail.find().lean().exec()
        res.send(company)
        res.status(200).send(company)

    }catch(e){
res.status(404).json({status:e.message, status:"Failed" })
    }

})

app.get("/company/:id",async (req, res) => {
    try{
        const company = await companyDetail.findById(req.params.id).lean().exec()
        res.send(company)
        res.status(200).send(company)

    }catch(e){
res.status(404).json({status:e.message, status:"Failed" })
    }

})


app.post("/company",async (req, res) => {
    try{
        const company = await companyDetail.create(req.body)
       res.status(201).send(company)
    }catch(e){
        res.status(500).json({status:e.message, status:"Failed" })
    }
})


app.patch("/company/:id" ,async(req, res)=>{
    try{
        const company = await companyDetail.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        
res.status(201).send(company)

}catch(e){
        res.status(500).json({status:e.message ,status:"failed"})
    }
})


app.delete("/company/:id" ,async(req, res)=>{
    try{
        const company = await companyDetail.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(company)
        
        
    }catch(e){
        res.status(500).json({status:e.message, status:"Failed" })
    }
})


// company ----------------------------------------------------------------




//skill-------------------------------
app.get("/skill",async (req, res) => {
    try{
        const skill = await skills.find().lean().exec()
        res.send(skill)
        res.status(200).send(skill)
        
    }catch(e){
        res.status(404).json({status:e.message, status:"Failed" })
    }

})

app.get("/skill/:id",async (req, res) => {
    try{
        const skill = await skills.findById(req.params.id).lean().exec()
        res.send(skill)
        res.status(200).send(skill)
        
    }catch(e){
res.status(404).json({status:e.message, status:"Failed" })
}

})

app.post("/skill",async (req, res) => {
    try{
        const skill = await skills.create(req.body)
        res.status(201).send(skill)
    }catch(e){
        res.status(500).json({status:e.message, status:"Failed" })
    }
})


app.patch("/skill/:id" ,async(req, res)=>{
    try{
        const skill = await skills.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
        
        res.status(201).send(skill)
        
    }catch(e){
        res.status(500).json({status:e.message, status:"Failed" })
    }
})


app.delete("/skill/:id" ,async(req, res)=>{
    try{
 const skill = await skills.findByIdAndDelete(req.params.id).lean().exec()
 res.status(201).send(skill)
 
 
}catch(e){
    res.status(500).json({status:e.message, status:"Failed" })
}
})


// skill-------------------------------



// jobs-------------------------------
app.get("/job",async (req, res) => {
    try{
        const job = await jobs.find().lean().exec()
        res.send(job)
        res.status(200).send(job)
        
    }catch(e){
        res.status(404).json({status:e.Message, status:"Failed" })
    }
    
})

app.get("/job/:id",async (req, res) => {
    try{
        const job = await jobs.findById(req.params.id).lean().exec()
        res.send(job)
        res.status(200).send(job)
        
    }catch(e){
        res.status(404).json({status:e.message, status:"Failed" })
    }
    
})


app.post("/job",async (req, res) => {
    try{
        const job = await jobs.create(req.body)
        res.status(201).send(job)
    }catch(e){
        res.status(500).json({status:e.message , status:"Failed"})
    }
})


app.patch("/job/:id" ,async(req, res)=>{
    try{
        const job = await jobs.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        })
      
        res.status(201).send(job)
        
    }catch(e){
        res.status(500).json({status:e.message , status:"Failed"})
    }
})


app.delete("/job/:id" ,async(req, res)=>{
    try{
        const job = await jobs.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(job)
        
        
    }catch(e){
        res.status(500).json({status:e.message , status:"Failed"})
    }
})






// jobs-------------------------------



// crudoperation--------------------------------
app.get('/jobtype', async (req, res) => {
    try {
        const company = await companyDetail.find({jobtype:"Work from Home"}).lean().exec()
        
        res.status(201).send(company)
    }catch(e){
        
    }
})


app.get('/noticeperiod',async (req, res)=>{
    try{
        
        
        const noticeperiod = await jobs.find({noticePeriod:"2 Month"}).lean().exec()
        
        res.status(200).send(noticeperiod)

    }catch(e){
        
    }
})


app.get('/rating', async (req, res)=>{
    try{
        const rating = await jobs.find().sort({Rating:1}).lean().exec()
        
        res.status(200).send(rating)
    }catch(e){
        
    }
})



app.get("/company/:id",async (req, res) => {
    try{
        const company = await companyDetail.findById(req.params.id).lean().exec()
        res.send(company)
        res.status(200).send(company)

    }catch(e){
res.status(404).json({status:e.message, status:"Failed" })
    }

})


app.get('/Hvacancy', async (req, res)=>{
try{
const highvacancy = await companyDetail.find().sort({vacany:-1}).limit(1).lean().exec()
res.status(200).send(highvacancy)

}catch(e){

}
})




// crudoperation--------------------------------


app.listen(2345, async (req, res) => {
    
    await connect()
    console.log("listening to port 2345");
})