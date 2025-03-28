const {userReport} = require("../models/reports")
const {Users} = require("../models/users")

async function handleGetUserReportData(req, res){
    try {
        const reports = await userReport.find({for: req.query.username})
        console.log("reports :",reports)
        res.send(reports)

    } catch (error) {
        throw error
    }
}
async function handleDeleteUserReport(req, res){
    try{
        await userReport.deleteOne({_id: req.query.id})
        await Users.updateOne({username: req.query.username}, {$inc: {reports: -1}})
        res.send("item deleted sucessfully")
    }
    catch (error) {
        console.log("error occured while deleting report")
    }
}

async function handlePostUserReport(req, res){
    try {
        const {reportType, message} = req.body
        const report = new userReport({
            from: req.user.username,
            for: req.query.username,
            reason: reportType,
            description: message
        })
        await report.save()
        await Users.updateOne({username: req.query.username}, {$inc: {reports: 1}})

        res.send("report submitted sucessfully")

    } catch (error) {
        throw error
    }
}

module.exports = {handleGetUserReportData, handleDeleteUserReport, handlePostUserReport}