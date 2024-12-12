

type HeadingProps = {
    children: React.ReactNode; // Acepta cualquier contenido válido de React como children
  };
  
  export default function Heading({ children }: HeadingProps): JSX.Element {
    return <h1 className="text-2xl font-bold">{children}</h1>; // Puedes ajustar el estilo según lo necesites
  }