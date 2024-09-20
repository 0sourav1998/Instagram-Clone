import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({comment}) => {
  return (
    <div className='flex gap-1 items-center'>
        <div>
            <Avatar>
                <AvatarImage className="rounded-full">{comment?.author?.photo}</AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
      <div>
        <span className='font-semibold'>{comment?.author?.username}</span> <span className='ml-1'>{comment?.text}</span>
      </div>
    </div>
  )
}

export default Comment
