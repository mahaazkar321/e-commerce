
import Sidebar from '../components/Home/Sidebar'
import ExploreOurProd from '../components/Home/ExploreOurProd'
import NewArrival from '../components/Home/NewArrival'
import FlashSales from '../components/Home/FlashSales'
import BestSellingProd from '../components/Home/BestSellingProd'
import BrowseByCat from '../components/Home/BrowseByCat'

const HomePage = () => {
    return (
        <div>
           <Sidebar/>
           <FlashSales/>
            <BrowseByCat/>
           <BestSellingProd/>
          
          <ExploreOurProd/>
          
          <NewArrival/>
       
        </div>
    )
}

export default HomePage
