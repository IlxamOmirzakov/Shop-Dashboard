import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const CreateCategory = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const url = 'https://online-dashboard-vw07.onrender.com/categories'
  const toast = useToast()

  function setCategories(e) {
    e.preventDefault()
    const data = {title, image}
    axios.post(url, data)
    .then((res) => (
      toast({
        title : 'Category added',
        status : 'success',
        isClosable : true,
        position : 'bottom-right'
      })
    ))
    .catch((err) => (
      toast({
        title : 'Category error added',
        status : 'error',
        isClosable : true,
        position : 'bottom-right'
      })
    ))
    setTitle('')
    setImage('')
  }

  return (
    <Box>
      <form onSubmit={(e) => setCategories(e)}>
        <FormControl mt={'10px'}>
          <FormLabel>Image Url</FormLabel>
          <Input size={'sm'} value={image} onChange={(e) => setImage(e.target.value)} required type='url' placeholder='Enter the image url'/>
        </FormControl>
        <FormControl mt={'10px'}>
          <FormLabel>Name</FormLabel>
          <Input size={'sm'} value={title} onChange={(e) => setTitle(e.target.value)} required type='text' placeholder='Enter the name'/>
        </FormControl>
        <Button type='submit' mt={'10px'} float={'right'} colorScheme='blue' rounded={'sm'} size={'sm'}>Submit</Button>
      </form>
    </Box>
  )
}

export default CreateCategory
