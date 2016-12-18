/**
 * Created by HANG on 11/23/2016.
 */
import mongoose from 'mongoose';

const bookMarkSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    collections: {
        type:[String],
        default:[]
    }
},{collection:'bookMarks'});

export default mongoose.model('bookMarks', bookMarkSchema);
