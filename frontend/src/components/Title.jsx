import React from 'react'


const Title = ({title,text}) => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold">
       <span>{title}</span>
       <span className="text-red-400 underline">{text}</span>
    </div>
  )
}


export default Title
