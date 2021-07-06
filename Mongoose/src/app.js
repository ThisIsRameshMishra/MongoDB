const mongoose = require("mongoose");
const validator =require("validator");
// connection creation and creating a new db
mongoose
  .connect("mongodb://localhost:27017/ttchannell", {
    useNewUrlParser: true,
    useUnifiedTopology: true,useCreateIndex:true
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));
//schema 
// A mongoose scheama defines the structure of the document,
//default values,validators,etc..

const playlistSchema=new mongoose.Schema({
     name:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
         minlength:2,
         maxlength:30,

     },
    ctype:{
        type:String,
        required:true,
        lowercase:true,
        enum:["frontend","backend","database"]
    },
    author:String,
    email:{
      type:String,
      required:true,
      unique:true,
      validate(val){
          if(!validator.isEmail(val)){
              throw new Error("invalid email");
          }
      }

    },
    videos:{
        type:Number,
        validate(val){
            if(val<0){
                throw new Error("should not negative");
            }
        }
    },
    active:Boolean,
    
})
//mongoose model provides an interface to the databse for CRUD operation.

const Playlist=new mongoose.model("Playlist",playlistSchema);

//create document or insert

const createDocument=async()=>{

    try{
     /*    const jsPlaylist=new Playlist({
            name:"javscript",
            ctype:"frontend",
            author:"me",
            videos:60,
            active:true,
            
        }) */
       /*  const mongoPlaylist=new Playlist({
            name:"MongoDB",
            ctype:"database",
            author:"me",
            videos:10,
            active:true,
            
        }) */
        const mongoosePlaylist=new Playlist({
            name:" dgf",
            ctype:"database",
            author:"me",
            email:"rameshmishra0825@gmail.com",
            videos:6,
            active:true,
            
        })
        /* const reactPlaylist=new Playlist({
            name:"reactjs",
            ctype:"frontend",
            author:"me",
            videos:50,
            active:true,
            
        }) */
        /* const nodejsPlaylist=new Playlist({
            name:"Nodejs",
            ctype:"backend",
            author:"me",
            videos:80,
            active:true,
            
        }) */
        //pass as an array
        const result=await Playlist.insertMany([mongoosePlaylist]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
createDocument();





// R E A D data


const getDocument=async ()=>{
  try{
      // $gt-operator  for graater than use $gt and grater than equal to use $gte

    const result1=await Playlist.find({videos:{$gt :50}})
    .select({name:1});


    // $in operator-find the courses of backend and database


    const result2=await Playlist.find({ctype:{$in:["backend","database"]}})
    .select({name:1});

        // $nin

        const result3=await Playlist.find({ctype:{$nin:["backend","database"]}}).select({name:1});

        //count query
       const result4=await Playlist.find({$and:[{ctype:"frontend"},{videos:80}]}).countDocuments();
        const result5=await Playlist.find({ctype:"database"}).countDocuments();

        //SORTING
        const result6=await Playlist.find({author:"me"}).select({name:1}).sort({name:1});

    console.log(result6);
  }
  catch(err){
      console.log(err);
  }
}


//getDocument();

// U P D A T E the document

const updateDocument=async(_id)=>{
    try{
        const result7=await Playlist.findByIdAndUpdate({_id},{$set:{
            name:"test videos"
        }
    }
    ,{
        new :true,
        useFindAndModify:false
    }
    );
    console.log(result7);
    }
    catch(err){
        console.log(err);
    }


}


//updateDocument("60e466d9dea9674598176f5d");



// D E L E T E Documents

const deleteDocument=async(_id)=>{
    try{
   const result8=await Playlist.findByIdAndDelete({_id});
   console.log(result8);
}
catch(err){
    console.log(err);
}
}

//deleteDocument("60e34d86d9722e46a0c2b118");