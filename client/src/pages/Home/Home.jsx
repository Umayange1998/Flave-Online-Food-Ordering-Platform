import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/EcploreMenu/ExploreMenu'

function Home() {

  const [category, setCategory] = React.useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home