import mongoose, { Document, Schema } from 'mongoose';

export interface BlogDocument extends Document{
    url: string;
  fullText: string;
  timestamp: Date;
}
const BlogSchema = new Schema<BlogDocument>({
    url:{type:String,required:true ,unique: true},
    fullText:{type:String,required:true},
    timestamp:{type:Date,default:Date.now}
});
const Blog = mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', BlogSchema);

export default Blog;