/* lib는 관습적인 폴더명 */

import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(),'posts')

/* cwd()는 현재의 디렉토리 명을 가져옴 (프로젝트 루트) */
// console.log(process.cwd())
// console.log(postsDirectory)

export function getSortedPostsData(){
  /* ['pre-rendering.md', 'ssg-ssr.md'] */
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName=>{
    const id = fileName.replace(/\.md$/,'')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    /* gray-matter는 md 파일을 string with front-matter 객체로 변환해줌 */
    const matterResult = matter(fileContents)

    return { 
      id,
      ...(matterResult.data as {date:string; title:string})
    }
  })

  return allPostsData.sort((a,b)=>{
    if(a.date<b.date){
      return 1
    }else{
      return -1
    }
  })
}

export function getAllPostsId(){
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName=>{
    return{
      params:{
        id: fileName.replace(/\.md$/,'')
      }
    }
  })
}