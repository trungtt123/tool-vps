const helper = require('../../../Action/Helper/helper');
const homeInstagram = require('./homeInstagram');
async function viewInstagram({ browser, profileData, config }) {
    const randStr = "1";
    const random = helper.getRandomPhrase(randStr, "|");
    switch (random) {
        case "1":
            await homeInstagram({ browser, profileData, config })
            break;
        default:
            break;
    }

}
module.exports = viewInstagram;