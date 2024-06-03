import { CSSTransition } from "react-transition-group";
import style from "./ToolTip.module.scss";
import { FC, useRef, useState } from "react";
import { TToolTip } from "./types";

const transitionClasses = {
  enter: style.exampleEnter,
  enterActive: style.exampleEnterActive,
  exit: style.exampleExit,
  exitActive: style.exampleExitActive,
};


const ToolTip : FC<TToolTip> = ({ children, text, customClass }) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const refSetTimeout = useRef<number>();
  const toolTipClasses = customClass
    ? `${style.tooltip} ${customClass}`
    : `${style.tooltip}`;

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, 750);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current);
    setShowToolTip(false);
  };
  return (
    <div
      className={style.container}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      <CSSTransition in={showToolTip} timeout={750} classNames={transitionClasses} unmountOnExit>
        <div className={toolTipClasses}>{text}</div>
      </CSSTransition>
    </div>
  );
};

export default ToolTip;
