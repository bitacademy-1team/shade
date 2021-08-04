import Contents from "../../service/Contents"

export default function ContentsComponent() {


    const {
        list
    } = Contents()
  
  
    return (
      <>
        {list.map((l,index) => {
          return <div key={l.contents_id}>
              <p>{l.title}</p>
          </div>
        })}
      </> 
    )
}