const fs = require("fs")
const flatted = require("flatted")
module.exports=class BaseDatabase{
    constructor(model){
        this.fileName=model.name//sınıfın ismini alıyoruz
        this.model=model//sınıfın kendisi
        //Buralar komple çok önemli
    }

    read(){
        const file = fs.readFileSync(__dirname+`/${this.fileName}.json`)
        const data=flatted.parse(file)
        return data.map(this.model.create)//Burası önemli
        //Burada gelen hangi sınıfsa veritabanında sakladığımız objeyi 
        //o sınıfa maplayerek dönüştürüyoruz.
    }
    
    save(data){
        return fs.writeFileSync(__dirname+`/${this.fileName}.json`,flatted.stringify(data),'utf-8')
    }

    insert(data){
        const dataFromDb= this.read()
        this.save(dataFromDb.concat(data))
    }
}
