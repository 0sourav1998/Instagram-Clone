import React, { useRef, useState } from 'react';
import { Dialog, DialogHeader } from './ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { addPost } from '@/service/operations/Post';
import { toast } from 'sonner';
import { setAllPosts, setPost } from '@/redux/slice/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const { user , token } = useSelector((state) => state?.user);
  const {post , allPost} = useSelector((state)=>state?.post)
  console.log(post)
  const [image,setImage] = useState(null);
  const [caption,setCaption] = useState(null);
  const [loading,setLoading] = useState(false) ;
  const dispatch = useDispatch();
  const imageRef = useRef()
  const handleSubmit = async()=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("caption",caption) ;
    try {
      setLoading(true)
      const result = await addPost(formData,token);
      if(result){
        dispatch(setAllPosts([result , ...allPost]))
        dispatch(setPost([...post,result]))
        setOpen(false);
        toast.success("Post Created Successfully")
      }
    } catch (error) {
      console.log(error?.message)
      toast.error("Failed To Create the Post")
    }finally{
      setLoading(false)
    }
  }
  const handleFileChange = (e)=>{
    const file = e?.target?.files?.[0] ;
    if(file){
      setImage(file)
    }
  }
  const handleChange = (e)=>{
    setCaption(e.target.value)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="fixed inset-0 flex justify-center items-center bg-black/50" 
          onInteractOutside={() => setOpen(false)}
        >
          <div className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between cursor-pointer">
               <DialogHeader>Create A Post</DialogHeader>
               <RxCross1  onClick={()=>setOpen(false)}/>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user?.photo || ""} alt={user?.userName || "User"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.username}</p>
                <span className="text-gray-500">{user?.bio || "Bio here"}</span>
              </div>
            </div>
            <div>
              <Textarea placeholder="Write Post Caption here..." className="border-none" onChange={handleChange}/>
            </div>
            <div>
              <input ref={imageRef} type='file' onChange={handleFileChange} hidden/>
            </div>
            <Button onClick={()=>imageRef?.current?.click()} className="w-fit mx-auto rounded-md bg-[#0095F6] text-white hover:bg-[#2589cc] transition-all duration-200">Choose From Galary</Button>
            <Button onClick={handleSubmit} type="submit" className="w-full bg-slate-900 text-white">
              {
                loading ? ("Loading...") : ("Post")
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
