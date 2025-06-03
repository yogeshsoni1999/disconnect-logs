import mongoose , {Schema , model} from "mongoose";

const DisconnectLogSchema = new Schema({
  computer_name: {
    type: String,
    required: true
  },
  disconnect_time: {
    type: Date,
    required: true
  }
})

export const DisconnectLog = model('DisconnectLog' , DisconnectLogSchema)
