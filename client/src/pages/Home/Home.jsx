import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/EcploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

function Home() {

  const [category, setCategory] = React.useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu  category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home