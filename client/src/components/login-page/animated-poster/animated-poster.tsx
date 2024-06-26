import Image from "../../../assets/girl.png";
import style from "./aniamted-poster.module.css";

const AnimatedPoster = () => {
  return <img src={Image} className={style.posterImg} />;
};

export default AnimatedPoster;
