import mongoose , {Schema , model} from "mongoose";

const DisconnectLogSchema = new Schema({
  computer_name: {
    type: String,
    required: true
  },
  disconnect_time: {
    type: Date,
    required: true
  },
    average_limit: {
    type: Number,
    default: 0,
  },
})

export const DisconnectLog = model('DisconnectLog' , DisconnectLogSchema)
