import mongoose, {Connection} from "mongoose";
class Database {
  private connection: Connection;
  private readonly URL:string = "mongodb+srv://projet:IFT3225@projet2.bnuus2i.mongodb.net/?retryWrites=true&w=majority&appName=projet2";

  constructor() {
    this.connection = mongoose.connection;
  }

  public async connect(){
    try{
        await mongoose.connect(this.URL);
        console.log("Connected to the database");
    }
    catch(err){
        console.error("An error occured during the connection",err);
    }
  }

  public async disconnect() {
    try{
        await mongoose.disconnect();
        console.log("Disconnected from the database");
    }
    catch(err){
        console.error("An error occured during the disconnection",err);
    }
  }

 
}

export default Database;