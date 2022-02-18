
var Kite = require("../mappingObjects/kite");

module.exports = {
    removeDuplicates: function (input) {
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (input[i].model === input[j].model && i !== j) {
                    input.pop()
                }
            }
        }
    },

    mapToBusObj: function (input) {

        let kites = []

        input.forEach(item => {
            let kite = new Kite()

            kite.id = item.id
            kite.brand = item.brand
            kite.model = item.model

            kites.push(kite)
        });
        return kites
    }
}