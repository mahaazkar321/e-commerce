
import Sidebar from '../components/Home/Sidebar'
import ExploreOurProd from '../components/Home/ExploreOurProd'
import NewArrival from '../components/Home/NewArrival'
import FlashSales from '../components/Home/FlashSales'
const HomePage = () => {
    return (
        <div>
           <Sidebar/>
           <FlashSales/>
          <ExploreOurProd/>
          <NewArrival/>
        </div>
    )
}

export default HomePage
