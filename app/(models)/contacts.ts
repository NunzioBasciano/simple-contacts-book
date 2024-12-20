import mongoose, { Schema } from "mongoose";

export interface IContact {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    isFavorite?: boolean; 
    
  }

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const contactSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String }, 
    phone: { type: String }, 
    email: { type: String }, 
    isFavorite: { type: Boolean }, 
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;