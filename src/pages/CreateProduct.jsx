import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../store/context'
import { getCategories } from '../hooks/getDataAxios'
import axios from 'axios'

const CreateProduct = () => {
  const {state, dispatch} = useContext(MainContext)
  const urlCat = 'https://online-dashboard-vw07.onrender.com/categories'
  const urlPro = 'https://online-dashboard-vw07.onrender.com/products'
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const toast = useToast()

  useEffect(() => {
    getCategories(urlCat, dispatch)
  }, [])

  function setProduct(e) {
    e.preventDefault()
    const data = {title, price, image, description, categoryId}
    axios.post(urlPro, data)
    .then((res) => (
      toast({
        title : 'Product added',
        status : 'success',
        isClosable : true,
        position : 'bottom-right'
      })
    ))
    .catch((err) => (
      toast({
        title : 'Product error added',
        status : 'error',
        isClosable : true,
        position : 'bottom-right'
      })
    ))
    setImage('')
    setTitle('')
    setPrice('')
    setDescription('')
    setCategoryId('')
  }

  return (
    <Box>
      <form onSubmit={(e) => setProduct(e)}>
        <FormControl>
          <FormLabel>Image url</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} type='url' required rounded={'sm'} placeholder='Enter the image url'/>
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} type='text' required rounded={'sm'} placeholder='Enter the name'/>
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} type='number' required rounded={'sm'} placeholder='Enter the price'/>
        </FormControl>
        <FormControl> 
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} resize={'none'} rounded={'sm'} padding={'5px'}></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel>Category name</FormLabel>
          <Select placeholder='Select category' value={categoryId} rounded={'sm'} required onChange={(e) => setCategoryId(e.target.value)}>
            {state.categories?.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </Select>
        </FormControl>
        <Button type='submit' size={'sm'} rounded={'sm'} float={'right'} colorScheme='blue' mt={'10px'}>Submit</Button>
      </form>
    </Box>
  )
}

export default CreateProduct
