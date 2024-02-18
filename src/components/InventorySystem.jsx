import { useState, useEffect } from "react";
import {
  generateRandomDemand,
  generateRandomLeadTime,
} from "../utils/inventoryHandler";
import InventoryBarChart from "./InventoryBarChart";

const InventorySystem = () => {
  const [inventoryLevel, setInventoryLevel] = useState(3);
  const [day, setDay] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(2);
  const [leadTime, setLeadTime] = useState(2);
  const [orderQuantity, setOrderQuantity] = useState(8);

  const [shortage, setShortage] = useState(0);
  const [inventoryData, setInventoryData] = useState([]);
  const [isSimulationEnd, setIsSimulationEnd] = useState(false);

  useEffect(() => {
    const dayInterval = setInterval(() => {
      if (day > 30) {
        setIsSimulationEnd(true);
        clearInterval(dayInterval);
        return;
      }

      

      const demand = generateRandomDemand();

      let newInventoryLevel = inventoryLevel - demand;

      let isOrderDelivered = day === deliveryDate;
      

      if (day < 5 && isOrderDelivered) {
        newInventoryLevel += 8;
      }


     
      let newToOrder = 0;
      let newLeadTime = 0;

      if (day > 0 && day % 5 === 0) {
        newLeadTime = generateRandomLeadTime();
        console.log({day, newLeadTime });
        setLeadTime(newLeadTime);
        setDeliveryDate(day + newLeadTime);

        newToOrder = newInventoryLevel < 0 ? 11 : 11 - newInventoryLevel;
        
        setOrderQuantity(newToOrder);
      }

      
      if (day >= 5 && isOrderDelivered) {
        newInventoryLevel += orderQuantity;
      }
      

      setInventoryLevel(newInventoryLevel);

      if (newInventoryLevel < 0) {
        let newShortage = newInventoryLevel * -1;
        setShortage(newShortage);
      } else {
        setShortage(0);
      }

      let isOrderDay = day === 1 || day % 5 === 0;
      
      console.log({day, deliveryDate, leadTime});

      const newInventoryData = {
        InventoryLevel: inventoryLevel,
        Shortage: shortage,
        demand,
        day,
        LeadTime: (day === 1 ? 2 : isOrderDay ? newLeadTime : 0),
        
        orderQuantity: (day === 1  ? 8 : isOrderDay ? newToOrder : 0),
        
        orderPlaced: Math.floor(day / 5) + 1,
       

        orderDelivered: day === deliveryDate + 1,
      };
      setInventoryData((prev) => [...prev, newInventoryData]);
      setDay((prev) => prev + 1);
    }, 500);

    return () => clearInterval(dayInterval);
  }, [day, inventoryLevel, deliveryDate, orderQuantity, shortage, leadTime]);

  return (
    <>
      <div
        className={`flex gap-3 mx-10 mt-10 ${
          isSimulationEnd ? "mb-20" : "mb-10"
        } ${
          day > 15 ? "flex-row overflow-x-auto" : "flex-row-reverse justify-end"
        }`}
      >
       
      </div>

      {inventoryData.length > 0 && (
        <InventoryBarChart
          inventoryData={inventoryData}
          isSimulationEnd={isSimulationEnd}
        ></InventoryBarChart>
      )}
    </>
  );
};

export default InventorySystem;
