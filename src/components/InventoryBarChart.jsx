
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const InventoryBarChart = ({inventoryData, isSimulationEnd}) => {
    console.log(inventoryData);
   
      return (

         <div>

            <h1 className='text-center mb-10 text-2xl font-semibold'>Inventory Simulation</h1>
 <ResponsiveContainer width="100%" height={ isSimulationEnd ? 500 : 300}>
        <ComposedChart
          width={500}
          height={400}
          data={inventoryData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="day" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="day" fill="#8884d8" stroke="#201658" />
          <Area type="monotone" dataKey="orderPlaced" fill="#8884d8" stroke="#416D19" />
          <Area type="monotone" dataKey="leadTime" fill="#8884d8" stroke="#8884d8" />
          <Area type="monotone" dataKey="demand" fill="#8884d8" stroke="#FB88B4" />
          <Area type="monotone" dataKey="orderQuantity" fill="#8884d8" stroke="#40A2E3" />
          <Bar dataKey="Shortage" barSize={20} fill="#9B4444" />
          <Line type="monotone" dataKey="InventoryLevel" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
         </div>
        
       

      );
        

};

export default InventoryBarChart;


