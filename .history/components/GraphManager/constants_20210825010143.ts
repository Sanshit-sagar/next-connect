// import { theme as lightTheme, darkTheme } from '../../stitches.config'
import { green, mauve } from '@radix-ui/colors'

export const AXIS_COLOR = 

export const AXIS_BOTTOM_TICK_LABEL_PROPS = {
  textAnchor: "middle" as const,
  fontFamily: "Roboto",
  fontSize: 10,
  fill: AXIS_COLOR,
};

export const AXIS_LEFT_TICK_LABEL_PROPS = {
  dx: "-0.25em",
  dy: "0.25em",
  fontFamily: "Roboto",
  fontSize: 10,
  textAnchor: "end" as const,
  fill: AXIS_COLOR,
};