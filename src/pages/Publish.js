import { Navigate, useNavigate } from 'react-router-dom' // Redirect dans les versions précédentes
import { useState } from 'react'
import axios from 'axios'
import Input from '../components/Input'

const Publish = ({ token }) => {
  const [file, setFile] = useState()
  const [preview, setPreview] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [condition, setCondition] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('brand', brand)
      formData.append('size', size)
      formData.append('color', color)
      formData.append('condition', condition)
      formData.append('city', city)
      formData.append('price', price)
      formData.append('picture', file)

      const response = await axios.post(
        'https://lereacteur-vinted-api.herokuapp.com/offer/publish',
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            // authorization: "Bearer " + token,
          },
        },
      )
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return token ? (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0])
            setPreview(URL.createObjectURL(event.target.files[0]))
          }}
        />
        {/* PREVIEW */}
        <img src={preview} />
        <br />
        <Input title={'Titre'} setValue={setTitle} />
        <br />
        <h4>Description</h4>
        <textarea onChange={(event) => setDescription(event.target.value)} />
        <br />
        <Input title="Marque" setValue={setBrand} />
        <br />
        <Input title="Taille" setValue={setSize} />
        <br />

        <Input title="Couleur" setValue={setColor} />
        <br />

        <Input title="Etat" setValue={setCondition} />

        <br />

        <Input title="Lieu" setValue={setCity} />
        <br />
        <h4>Prix</h4>
        <input
          onChange={(event) => setPrice(event.target.value)}
          type="number"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  ) : (
    <Navigate to={'/login'} state={{ fromPublish: true }} />
  )
}

export default Publish
