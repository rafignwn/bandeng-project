import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import useAxiosJwt from "../../hooks/useAxiosJwt";

const items = {
  items: ["Nilai pH Saat Ini", "Level pH", "Kondisi pH Tambak", "Jumlah Data"],
};

export default function InfoMonitoring() {
  const [dataPh, setDataPh] = useState(items);
  const api = useAxiosJwt();

  useEffect(() => {
    fetchPHRecords();
    // eslint-disable-next-line
  }, []);

  // sebuah fungsi untuk mengambil data pH yang terbaru dari server
  const fetchPHRecords = async () => {
    try {
      const response = await api.get("/ph/CurrentpHValue");
      const data = response.data;
      setDataPh({
        ...items,
        values: [
          [data.nilaiPh],
          [data.levelPh],
          [data.kondisi],
          [data.jumlah_data],
        ],
      });
    } catch (error) {
      console.log("Error maseh");
    }
  };
  // end function

  return (
    <div className="info-monitoring">
      <ItemInfo data={dataPh} titleInfo={"Informasi Monitoring"} />
    </div>
  );
}
