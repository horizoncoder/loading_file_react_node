
const clientServices = require('../../services/clients/clients.service')
exports.getClientsFromCSV = async function (req, res) {
    try {
        let tags =['follow_up', 'ex_client', 'has_credits']
        if(!tags.includes(req.body.tag)){
            return res.status(400).json({ status: 400, message: `You entered a non-existent tag list of available tags: ${tags}`  });
        }
        const clients = await  clientServices.getClientsFromCSV(req, res)
        return res.status(200).json({ status: 200, data: clients, count: clients.length });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.sendMessageToClient = async function (req, res) {
    try {
         await clientServices.sendMessage(req, res)
        return res.status(200).json({ status: 200, message: `message sent to ${req.body.client_id} ` });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}