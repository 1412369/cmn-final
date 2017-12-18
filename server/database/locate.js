const Root = require('./root')

class Locate extends Root {
    constructor(collection) {
        super(collection)
        
    }
    static GetCollection(){
        return new Locate('locates')
    }
}
module.exports = Locate.GetCollection()