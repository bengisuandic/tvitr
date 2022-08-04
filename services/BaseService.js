
module.exports=class BaseService{
    // constructor(model){
    //     // this.fileName=model.name//sınıfın ismini alıyoruz
    //     this.model=model//sınıfın kendisi
    //     //Buralar komple çok önemli
    // }

    // async read(){
    //     return this.model.find();
    //     // return new Promise((resolve, reject) => {
    //     //     fs.readFile(__dirname+`/${this.fileName}.json`,async (err,data) => {
    //     //       if (err)
    //     //        return reject(err)
                
    //     //     const items = flatted.parse(data).map(this.model.create)
    //     //     resolve(items)
    //     //     })
    //     // })
    //     //Burada gelen hangi sınıfsa veritabanında sakladığımız objeyi 
    //     //o sınıfa maplayerek dönüştürüyoruz.
    // }
    
    // save(data){

    //     // return fs.writeFileSync(__dirname+`/${this.fileName}.json`,flatted.stringify(data),'utf-8')
    // }

    // insert(data){
    //     const dataFromDb= this.read()
    //     this.save(dataFromDb.concat(data))
    // }

    // findById(id){
    //     const data=this.read()
    //     const index=data.findIndex(file=>file.id===id)
    //     if(index===-1){
    //         return "Aradığınız kayıt bulunamadı."
    //     }
    //     return data[index]
        
    // }

    // find(id){
    //     const data=this.read()
    //     const index=data.findIndex(file=>file.id===id)
    //     return index
    // }

    // delete(id){
    //     const data=this.read()
    //     const del= this.find(id)
    //     this.save(data.splice(del,1))
    // }

    async findAll() {
        return this.model.find()
      }
    
      async add(item) {
        try {
            
            return this.model.create(item)
        } catch (error) {
            return error.message
        }
      }
    
      async  del(itemId) {
        return this.model.remove({ _id: itemId })
      }
    
      async find(itemId) {
        return this.model.findById(itemId)
      }
    //   async findByUserName(username) {
    //     return this.model.findOne({userName:username})
    //   }
      
      async query(object){
        return this.model.find(object)
      }
      
      async update(itemId,set) {
        return this.model.update(itemId,set,{upsert:true})
      }

      async saveObject(){
        return this.model.save()
      }
}
