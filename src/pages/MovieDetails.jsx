import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  return <h1>Showing Movie: { id }</h1>;
}
