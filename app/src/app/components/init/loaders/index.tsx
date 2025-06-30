import LoadMe, { action as meAction } from "./LoadMe";

export default {
  [meAction]: () => <LoadMe />,
} as Record<string, () => React.JSX.Element>;

export { meAction };
