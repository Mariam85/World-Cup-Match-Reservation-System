import { useState,useEffect } from "react";
import SeatPicker from "react-seat-picker";
import "bootstrap/dist/css/bootstrap.min.css";

import "./FanPage.css";

// export default function Reservation() {
const Reservation = ({seatsRows}) => {
    
    

    const [rows, setRows] = useState(seatsRows)
    // console.log(seatsRows);
//   const rows = [
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 11 },
//       { number: 12 },
//       { number: 13, isReserved: true },
//       { number: 14 },
//       { number: 15 },
//       { number: 16 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//     ],
//     [],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//       { number: 12 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//       { number: 12 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//       { number: 11 },
//     ],
//     [
//       { number: 1 },
//       { number: 2 },
//       { number: 3, isReserved: true },
//       { number: 4 },
//       { number: 5 },
//       { number: 6 },
//       { number: 7 },
//       { number: 8 },
//       { number: 9 },
//       { number: 10 },
//     ],
//   ];

//   console.log(rows);
// const rows=seatRows
//   const [loading, setLoading] = useState(false)
//   useEffect(() => {
//     const addSeatCallback = ({ row, number, id }, addCb)  => {
//         async () => {
//             await new Promise(resolve => setTimeout(resolve, 1500))
//             console.log(`Added seat ${number}, row ${row}, id ${id}`)
//             const newTooltip = `tooltip for id-${id} added by callback`
//             addCb(row, number, id, newTooltip)
//             setLoading( false )
//           }
//       };

//       addSeatCallback({{ row, number, id }, addCb)
//   }, [third])
  
//   const addSeatCallback = ({ row, number, id }, addCb)  => {
//     setLoading(
//         true
//       , async () => {
//         await new Promise(resolve => setTimeout(resolve, 1500))
//         console.log(`Added seat ${number}, row ${row}, id ${id}`)
//         const newTooltip = `tooltip for id-${id} added by callback`
//         addCb(row, number, id, newTooltip)
//         setLoading( false )
//       })
//   };

  return (
    <div className="app1">
      <h1 className="screen">SCREEN</h1>
      <SeatPicker
        rows={rows}
        maxReservableSeats={100}
        // addSeatCallback={addSeatCallback}
        visible
      />
      {/* <div className="seat-select">
        <h1>SEAT:</h1>
      </div> */}
    </div>
  );
};

export default Reservation;
