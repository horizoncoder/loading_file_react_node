
const  fileServices = require('../../services/files/file.service')
const axios = require("axios")
async function getClientsFromCSV (req,res) {
    try {
        // get business_uid from file
        const business_uid = await fileServices.getDataFromFile(req, res)

        const clients = [];
        for (const uid of business_uid) {
                const data = await getBusinessClients(uid)
                clients.push(...data)
        }
        return clients.filter(({ tags }) => !!tags && tags.includes(req.body.tag))

    }catch (e) {
        console.error(e)
    }
}

async function getBusinessClients(business_uid) {
    let config = {
        method: 'get',
        url: 'https://api.vcita.biz/platform/v1/clients',
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${process.env.AUTH_KEY}`,
            'X-On-Behalf-Of': business_uid,
        },
    };

    try {
        const response = await axios(config);
        return response.data.data.clients;
    } catch (error) {
        console.error(error)
    }
}

 const  sendMessage = async (req, res) => {
    const { body: { message, client_id, business_uid } } = req;

    const options = {
        method: "post",
        url: "https://api.vcita.biz/platform/v1/messages",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${process.env.AUTH_KEY}`,
            "X-On-Behalf-Of": business_uid,
        },
        data: {
            message: {
                client_id: client_id,
                text: message,
                direction: "business_to_client",
            },
        },
    };

    try {
        const response = await axios(options);
        const message = response.data.data;
        return await message
    } catch (error) {
        console.error(error)
    }
};
module.exports = {
    sendMessage,
    getClientsFromCSV
};
