import Link from "next/link"
import CreatePost from "./createPost"

async function getData (){
  /* SSR 방식으로 매 fetch 때 마다 새로 요청하기,  */
  const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records',
  {cache: 'no-store'})

  const data = await res.json()
  console.log(data)
  return data?.items as any[]
}


const postPage = async () => {
  const posts = await getData()

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map(post=>{
        return <PostItem key={post.id} post={post}  />
      })}
      <CreatePost/>
    </div>
  )
}

const PostItem = ({post}: any) => {
  const {id, title, created} = post || {}

  return (
    <>
      <Link href={`/posts/${id}`}>
        <div>
          <h3>{title}</h3>
          <p>{created}</p>
        </div>
      </Link>

    </>
  )
}

export default postPage