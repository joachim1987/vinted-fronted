import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Offer = () => {
  const { id } = useParams()
  // console.log(id);

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`,
        )
        // console.log(response.data);
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [id])

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <Link to="/payment" state={{ title: 'Toto', price: '12' }}>
        Acheter
      </Link>
      ;<h3>{data.product_name}</h3>
      <img src={data.product_image.secure_url} alt="" />
      <ul>
        {/* product_detials étant un tableau, on peut faire un .map() pour le parcourir */}
        {data.product_details.map((elem, index) => {
          // elem = chaque élément du tableau
          // { MARQUE: "Zara" } au 1er tour, etc.
          const keys = Object.keys(elem)
          // au 1er tour : keys vaut ["MARQUE"]
          return (
            <li key={index}>
              {/* au 1er tour : keys[0] vaut MARQUE  */}
              <span>{keys[0]}</span>
              {/* et elem[keys[0]] revient à accéder à elem["MARQUE"] donc elem.MARQUE donc "Zara" */}
              <span>{elem[keys[0]]}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Offer
