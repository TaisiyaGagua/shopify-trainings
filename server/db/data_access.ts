import mongoose from "mongoose";

class DataAccess {
    constructor() {}

    static async connect(connectionString: string) {
        await mongoose.connect(connectionString);
    }
    static onError(arg0: string, onError: any) {
        console.log("Error while trying to connect to mongo");
        console.log(arg0);
    }

    static onConnected(arg0: string, onConnected: any) {
        console.log("connected to mongodb");
    }
}

export default DataAccess;
