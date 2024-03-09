import email from "../model/email.js";

export const saveSentEmails = async (req, resp) => {
    try {
        console.log(req.body);
        let Email = new email(req.body);
        const response = await Email.save();
        resp.status(200).json(response);
    } catch (err) {
        resp.status(500).json(err.message);
    }
}

export const getEmails = async (req, resp) => {
    try {
        let emails;
        if (req.params.type === 'bin') {
            emails=await email.find({bin:true});
        } else if(req.params.type==='allmail'){
            emails=await email.find();
        } else if(req.params.type==='starred'){
            emails=await email.find({starred:true});
        }
        else {
            emails = await email.find({ type: req.params.type });
        }
        return resp.status(200).json(emails);
    } catch (err) {
        console.log(err);
        resp.status(500).json(err.message);
    }
}
export const moveEmailsToBin = async (req, resp) => {
    try {
        await email.updateMany({ _id: { $in: req.body } }, { $set: { starred: "false", type: "", bin: true } })
        return resp.status(200).json("Emails Deleted Succesfully")
    } catch (err) {
        resp.status(500).json(err.message);
    }
}
export const toggleStarredEmail = async (req, resp) => {
    try {
        await email.updateOne({ _id:  req.body.id } , { $set: { starred: req.body.value } })
        return resp.status(200).json("Starred Update Succesfully Succesfully")
    } catch (err) {
        resp.status(500).json(err.message);
    }
}
export const DeleteEmails = async (req, resp) => {
    try {
        await email.deleteMany({ _id: { $in: req.body } })
        return resp.status(200).json("Emails Deleted Succesfully")
    } catch (err) {
        resp.status(500).json(err.message);
    }
}