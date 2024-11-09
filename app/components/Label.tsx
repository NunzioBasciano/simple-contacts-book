export interface ILabelProps {
  label: string;
}

function Label(props: ILabelProps) {
  const { label } = props;
  return <h3 className="px-3 text-base">{label}</h3>;
}

export default Label;
