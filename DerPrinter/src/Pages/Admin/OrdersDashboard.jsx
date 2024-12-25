/* eslint-disable no-unused-vars */
import BoxOrder from "../../components/ui/BoxOrder";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../Redux/actions/OrderAction";
import useEmblaCarousel from "embla-carousel-react";
import OrdersTable from "./OrdersTable";

const OrdersDashboard = () => {
  const dispatch = useDispatch();

  const { allOrders, error } = useSelector((state) => state.orders);
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState(""); //startDate
  const [endDate, setEndDate] = useState(""); // endDate

  useEffect(() => {
    dispatch(getAllOrders(10000,1));
  }, [dispatch]);

  const orders = allOrders?.data || []; // Safeguard to access allOrders.data

  const pendingOrders =
    orders?.filter((order) => order.status === "pending").length || 0;

  const deliveredOrders =
    orders?.filter((order) => order.status === "delivering").length || 0;

  const totalOrders = orders?.length || 0;

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    speed: 10,
    slidesToScroll: 1,
    dragFree: true,
  });

  // Date Filtering
  const dateFilteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && orderDate < start) return false;
    if (end && orderDate > end) return false;

    return true;
  });

  // Status Filtering
  const statusFilteredOrders = dateFilteredOrders.filter((order) => {
    if (filter === "pending") return order.status === "pending";
    if (filter === "delivering") return order.status === "delivering";
    return true;
  });

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Bestellungen
        </h1>

        <div
          ref={emblaRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6"
        >
          <BoxOrder
            text="Neue Bestellungen"
            num={totalOrders}
            abdruck={`Abdruck - 100%`}
            className={`${
              filter === "all" ? "text-blue-500" : ""
            } font-bold lg:text-[18px] text-[14px]`}
            onClick={() => setFilter("all")}
          />
          <BoxOrder
            text="Ausstehende Bestellungen"
            num={pendingOrders}
            abdruck={`Abdruck - ${((pendingOrders / totalOrders) * 100).toFixed(
              1
            )}%`}
            className={`${
              filter === "pending" ? "text-blue-500" : ""
            } font-bold lg:text-[18px] text-[14px]`}
            onClick={() => setFilter("pending")}
          />
          <BoxOrder
            text="Ausgelieferte Bestellungen"
            num={deliveredOrders}
            abdruck={`Abdruck - ${(
              (deliveredOrders / totalOrders) *
              100
            ).toFixed(1)}%`}
            className={`${
              filter === "delivering" ? "text-blue-500" : ""
            } font-bold lg:text-[18px] text-[14px]`}
            onClick={() => setFilter("delivering")}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-3 md:p-4 overflow-x-auto w-full">
          {/* Filter by Date */}
          <div className="flex md:flex-row flex-col gap-4 justify-end mb-4 ">
            <div className="flex items-center gap-2">
              <label
                htmlFor="start-date"
                className="block md:text-lg text-sm font-bold"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="end-date"
                className="block md:text-lg text-sm font-bold"
              >
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <OrdersTable
            allOrders={orders} // Pass the updated 'orders' array
            statusFilteredOrders={statusFilteredOrders}
          />
        </div>
      </div>
    </>
  );
};

export default OrdersDashboard;
