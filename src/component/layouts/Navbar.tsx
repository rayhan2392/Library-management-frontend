import { useGetBooksQuery } from "../../redux/api/bookApi"

const Navbar = () => {
  const {data} = useGetBooksQuery(undefined)
  console.log(data)
  return (
    <div>Navbar</div>
  )
}

export default Navbar