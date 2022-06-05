import React, { useEffect, useState } from "react";
import ItemInfo from "../ItemInfo/ItemInfo";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./pakanStyles.css";
import LinkHome from "../LinkHome/LinkHome";
import useAxiosJwt from "../../hooks/useAxiosJwt";
import checkLogin from "../../utils/checkLogin";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../ButtonLogout/ButtonLogout";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export default function MonitroingPakan() {
  const [sisaPakan, setSisaPakan] = useState(0);
  const api = useAxiosJwt();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dataPakanDefault = {
    items: ["Jam Pemberian Pakan Ikan", "Penggunaan Terakhir Pakan Ikan"],
    values: [["07:00", "13:00", "17:00"]],
    link: {
      title: "Beri Pakan Ikan",
      type: "button",
      action: async function (e) {
        console.log("Sedang memberi pakan ikan");
        e.currentTarget.textContent = "Sedang Memberi Pakan";
        e.currentTarget.classList.add("btn-wait");
        let intervalPakan = setInterval(async () => {
          const response = await axios.get(`${BASE_URL}/feed/CheckTimeToFeed`);
          console.log(response.data);
          if (response.data === 0) {
            const btnWait = document.querySelector(".btn-wait");
            btnWait.textContent = "Beri Pakan Ikan";
            btnWait.classList.remove("btn-wait");

            clearInterval(intervalPakan);
          }
        }, [2500]);
        const resAxios = await api.get("/feed/FeedTheFish");
        console.log(resAxios.data);
      },
    },
  };

  const [dataPakan, setDataPakan] = useState(dataPakanDefault);

  useEffect(() => {
    (async () => {
      // cek pakah sudah login apa belum
      const isLogin = await checkLogin();
      // jika sudah login ambil data di server
      if (isLogin) {
        setLoading(false);
        fetchFeedRecords();
      } else {
        // jika belum login redirect ke halaman login
        navigate("/");
      }
    })();
    // eslint-disable-next-line
  }, []);

  // sebuah fungsi untuk mengambil data pakan terbaru dari server
  const fetchFeedRecords = async () => {
    try {
      const response = await api.get("/feed/ShortRecords");
      const data = response.data;
      setSisaPakan(data.sisaPakan);
      const waktu_pakan = format(
        parseISO(data.waktuPakan),
        "eeeeeeee, dd MMM yyyy HH:mm:ss",
        {
          locale: id,
        }
      );
      dataPakanDefault.values = [
        ...dataPakanDefault.values,
        [`${data.beratPakan} kg`, waktu_pakan],
      ];
      setDataPakan(dataPakanDefault);
    } catch (error) {
      console.log("Error maseh");
    }
  };
  // end function

  return loading ? (
    <div></div>
  ) : (
    <div className="mt-30">
      <ButtonLogout />
      <LinkHome />
      <div className="monitoring-pakan">
        <h5>Informasi Monitoring Pakan Ikan</h5>
        <div className="body-monitoring">
          <ProgressBar value={sisaPakan} title={"Sisa Pakan"} />
          <ItemInfo data={dataPakan} titleInfo={"Info Pemberian pakan"} />
        </div>
      </div>
    </div>
  );
}
