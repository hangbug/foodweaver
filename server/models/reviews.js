/**
 * Created by HANG on 11/19/2016.
 */
import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    title:{
        type:String
    }
},{collection:'reviews'});

export default mongoose.model('reviews', reviewsSchema);