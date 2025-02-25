"use client"

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

const  Page =  ({
    params,
}: {
   params: Promise<{ id: string }>;
}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        await fetch('/api/post',{
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            title, content, id: (await params).id
        })
    }).then((res) => {
        console.log(res)

    }).catch((e)  => {
        console.log(e)
    }) 

        router.push('/event');
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getData = async () => {
        const res = await fetch('/api/post/' + (await params).id)
        const json = await res.json()

        console.log(json)
        
        if(!json){
        router.push('/404')
        return;
        }
        setTitle(json.post.title)
        setContent(json.post.content)
      }

  return (
    <div className="max-w-7xl mx-auto" >
      <div className="p-5">
      <h2 className="text-2xl font-bold">Update Event</h2>
      <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
    <input
      type="text" placeholder="Masukkan Judul" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-5 py-3 px-5 border rounded-md"
    />
    <textarea
      placeholder="Masukkan Konten" rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="py-1 px-4 border rounded-md resize-none"
    />
    <button type='submit' className='bg-slate-800 text-white mt-5 px-4 py-1 rounded-md cursor-pointer' >Update</button>
  </form>
      </div>
  </div>
  )
}
export default Page