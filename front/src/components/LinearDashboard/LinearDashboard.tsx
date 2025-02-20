import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styles from "./linearDashboard.module.scss";
import { ReactSVG } from "react-svg";

interface Props {
  data: {
    date: string;
    value: number;
  }[];
}
const LinearDashboard = ({ data }: Props) => {
  return (
    <div className={styles.linear}>
      <h2>Заказы</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 122, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 122, 255, 0)" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical horizontal={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#007AFF"
            fill="url(#gradient)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className={styles.calendar}>
        <div className={styles.text}>
          <ReactSVG src="./iconsSvg/calendar.svg" />
          <span>Календарь</span>
        </div>

        <ReactSVG src="./arrows/arrowRight.svg" />
      </div>
    </div>
  );
};

export default LinearDashboard;
