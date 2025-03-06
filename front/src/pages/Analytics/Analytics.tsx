import LinearDashboard from "../../components/LinearDashboard/LinearDashboard";
import Table from "../../components/Table/Table";
import styles from "./analytics.module.scss";
import OpenFromSide from "../../components/OpenFromSide/OpenFromSide";
import { useURLState } from "../../hooks/useURLState";
import Details from "./Details/Details";
import MoreDetails from "./Details/MoreDetails";
import LinkButtonWithNotification from "../../components/Button/LinkButtonWithNotification";
import { useGetAnalyticsQuery } from "../../features/analytics/analiticsSlice";

const Analytics = () => {
  const { getParam, setParam } = useURLState();
  const { data: analytics } = useGetAnalyticsQuery();

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

  console.log(analytics?.data);

  return (
    <>
      <div className={`container ${styles.analitiycs}`}>
        <div className={styles.header}>
          <h2>Аналитика</h2>
        </div>

        <div className={styles.main}>
          <LinkButtonWithNotification
            text="Новые действия админов"
            notification={12}
          />

          <div className={styles.table}>
            <Table
              icon="./iconsSvg/money.svg"
              iconText="Заработок"
              hintText="Сегодня"
              mainText="."
              curency="сум"
            />
            <Table
              icon="./iconsSvg/timer.svg"
              iconText="Заказы"
              hintText="Сегодня"
              mainText="."
            />
          </div>

          <div className={styles.moreInfo}>
            <h3>Аналитика нажатий</h3>

            <div className={styles.table}>
              <Table
                icon="./iconsSvg/thunder.svg"
                iconText="Звонки"
                hintText="Всего"
                mainText={String(analytics?.data.call)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Посещение"
                hintText="Всего"
                mainText="."
              />

              <Table
                icon="./iconsSvg/location.svg"
                iconText="Позвонить"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.call)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Заказать"
                hintText="Всего нажатий"
                mainText="."
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Маршрут"
                hintText="Сегодня"
                mainText={String(analytics?.data.route)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Поделиться"
                hintText="Сегодня"
                mainText={String(analytics?.data.share)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Поиск"
                hintText="Всего нажатий"
                mainText="."
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Такси"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.taxi)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Переслано в чате"
                hintText="Сегодня"
                mainText={String(analytics?.data.chat)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Переход на сайт"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.website)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Моб. приложение"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.web_app)}
              />
              <Table
                icon="./iconsSvg/location.svg"
                iconText="Рабочее время"
                hintText="Всего нажатий"
                mainText={String(analytics?.data.working_hours)}
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
