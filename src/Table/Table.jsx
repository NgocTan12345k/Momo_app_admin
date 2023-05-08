import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DonationAPI from "../API/DonationAPI";
import dateFormat from "dateformat";
import convertMoney from "../convertMoney";

const Table = () => {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    try {
      const getAllDonation = async () => {
        const res = await DonationAPI.getAllDonation();
        setDonations(res.data);
      };
      getAllDonation();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // sort Donation ascending

  const sortDonationsAsc = donations.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const lastesDonation = sortDonationsAsc.slice(0, 8);

  const columns = [
    { field: "col1", headerName: "STT", width: 50 },
    {
      field: "col2",
      headerName: "Full Name",
      width: 250,
    },
    {
      field: "col3",
      headerName: "Create date",
      type: "string",
      width: 150,
    },
    {
      field: "col4",
      headerName: "Amount",
      type: "number",
      width: 150,
    },
    {
      field: "col5",
      headerName: "Payment method",
      width: 200,
    },
  ];

  const rows = lastesDonation.map((item, index) => {
    return {
      id: item._id,
      col1: index + 1,
      col2: item.user_id.fullName,
      col3: dateFormat(item.createdAt, "dd/mm/yyyy"),
      col4: convertMoney(item.amount),
      col5: item.payment,
    };
  });
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Table;
