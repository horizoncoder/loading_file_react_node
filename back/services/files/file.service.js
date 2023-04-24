const { parse } = require("csv-parse/sync");
exports.getDataFromFile = async function (req,res) {
    try {
        if (req.files) {
            const file = req.files.file
            let businessUids = parse(file.data, {
                comment: "#",
            });
            // remove business_uid head
            businessUids = businessUids.splice(1, businessUids.length - 1);

            return businessUids.map((el) => {
                return el[0]
            })
        }
    } catch (error) {
        console.error(error)
    }
}