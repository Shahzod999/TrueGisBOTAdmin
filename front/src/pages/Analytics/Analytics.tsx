import LinearDashboard from "../../components/LinearDashboard/LinearDashboard";
import Table from "../../components/Table/Table";
import styles from "./analytics.module.scss";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../hooks/useURLState";
import Details from "./Details/Details";
import MoreDetails from "./Details/MoreDetails";
import { useGetAnalyticsQuery } from "../../features/analytics/analiticsSlice";

const Analytics = () => {
  const { getParam, setParam } = useURLState();
  const { data: analytics } = useGetAnalyticsQuery(undefined, {
    pollingInterval: 10000, // Запрос каждые 10 секунд
  });

  const initialPage = Boolean(getParam("details"));
  const moreDetalsPage = Boolean(getParam("moreDetails"));

  const data = [
    { date: "26 ноя", value: 100 },
    { date: "27 ноя", value: 120 },
    { date: "28 ноя", value: 140 },
    { date: "29 ноя", value: 90 },
    { date: "30 ноя", value: 110 },
    { date: "1 дек", value: 130 },
  ];

  return (
    <>
      <div className={`container ${styles.analitiycs}`}>
        <div className={styles.header}>
          <h2>Аналитика</h2>
        </div>

        <div className={styles.main}>
          <div className={styles.table}>
            <Table
              icon="./iconsSvg/money.svg"
              iconText="Заработок"
              hintText="Сегодня"
              mainText="0"
              curency="сум"
            />
            <Table
              icon="./iconsSvg/timer.svg"
              iconText="Заказы"
              hintText="Сегодня"
              mainText="0"
            />
          </div>

          <div className={styles.moreInfo}>
            <h3>Аналитика нажатий</h3>

            <div className={styles.table}>
              <Table
                icon="./iconsSvg/thunder.svg"
                iconText="Звонки"
                hintText="Всего"
                mainText={String(analytics?.data.call || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Посещение"
                hintText="Всего"
                mainText="0"
              />

              <Table
                icon="./iconsSvg/location.svg"
                iconText="Позвонить"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.call || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Заказать"
                hintText="Всего нажатий"
                mainText="0"
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Маршрут"
                hintText="Сегодня"
                mainText={String(analytics?.data.route || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Поделиться"
                hintText="Сегодня"
                mainText={String(analytics?.data.share || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Поиск"
                hintText="Всего нажатий"
                mainText="0"
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Такси"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.taxi || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Переслано в чате"
                hintText="Сегодня"
                mainText={String(analytics?.data.chat || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Переход на сайт"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.website || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Моб. приложение"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.web_app || 0)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Рабочее время"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.working_hours || 0)}
              />
            </div>
          </div>

          <LinearDashboard data={data} />
        </div>
      </div>

      <OpenFromSide
        isOpen={initialPage}
        onClose={() => setParam("details", false)}>
        <Details />
      </OpenFromSide>

      <OpenFromSide
        isOpen={moreDetalsPage}
        onClose={() => setParam("moreDetails", false)}>
        <MoreDetails />
      </OpenFromSide>
    </>
  );
};

export default Analytics;
