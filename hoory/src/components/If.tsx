interface IIfProps {
  condition: boolean;
  children: JSX.Element;
}

function If({ condition, children }: IIfProps) {
  if (!condition) return null;

  return children;
}

export default If;
