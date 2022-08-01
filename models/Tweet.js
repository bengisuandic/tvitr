const {parse, stringify, toJSON, fromJSON} = require('flatted');

class Tweet {
    constructor(data, user) {
        this.likes=[]
        this.data=data
        this.user = user
    } 
    
    static create({data},user){
        return new Tweet(data,user)
    }

    // toJSON() {
    //     return Flatted.stringify(this);

    // }
}


module.exports=Tweet