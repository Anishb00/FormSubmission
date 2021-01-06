import React from 'react';


const Summary = (props) => {
  //if props.data is null then return null
  if (!props.data) {
    return null
  }
  //else
  else {
    //iterate over the data
    return(
      <div>
       <h1>Summary</h1>
        <div>
          {props.data.map((value,index) => {
            return (
              <div>
                <h3>{`Page ${index + 1}`}</h3>
                <Page page = {value}/>
              </div>
            )
          })
          }
        </div>
      </div>
    )
    //map each entry as prop to Page
  }


}


const Page = (props) => {
    //iterate over the pagesdata
      //for each value make a containter div
      //inside container dive pass that pages value to the list comp
  return(

    <div>
      <ul>
        {props.page.map((value) => {
            return <li>{value}</li>
          })
        }
      </ul>
    </div>

  )


}

export default Summary;