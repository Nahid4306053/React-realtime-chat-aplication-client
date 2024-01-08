
import Useravatar from './Useravatar'
import Buddy from './Buddys/Buddy'
import "../../App.css"
import BottomPart from './BottomPart'
export default function Sidebar() {
  return (
    <div className='mainpart h-full '>
       <div className="top_part custom_scrollbar  lg:h-1/6  sticky top-0 border-b-2 border-slate-700 bg-[#1b2636]  w-full">
       <Useravatar/>      
      </div>       
      <div className="middle_parth h-2/6 custom_scrollbar  md:h-4/6 overflow-auto">
        <Buddy/> 
      </div>       
      <div className="bottom_part h-3/6 md:h-2/6 lg:h-1/6 border-t-2 shadow-lg border-slate-700 bg-[#1a2535] sticky bottom-0">
          <BottomPart/>
      </div>
    </div> 
  )
}
