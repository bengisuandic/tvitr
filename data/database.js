const fs = require("fs")
const flatted = require("flatted")
module.exports=class BaseDatabase{
    constructor(model){
        this.fileName=model.name
        this.model=model
        //Buralar komple çok önemli
    }

    read(){
        const data=flatted.parse(fs.readFileSync(__dirname+`/${this.fileName}.json`))
        // console.log(data,"-----------<")
        return data.map(this.model.create)//Burası önemli
        
    }
    
    save(data){
        // console.log(this.model)
        // console.log(this.read())
        const file =flatted.stringify(data)
        return fs.writeFileSync(__dirname+`/${this.fileName}.json`,file,'utf-8')
    }

}
