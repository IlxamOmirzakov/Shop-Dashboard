import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../store/context'
import axios from 'axios'
import { getCategories, getProducts } from '../../hooks/getDataAxios'

const AlertUpdate = ({isOpen, onOpen, onClose, itemId, url, type}) => {
  const {state, dispatch} = useContext(MainContext)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const toast = useToast()

  async function UpdateCategory(id) {
    const data = type=='product'? {image, title, price, description} : {image, title}
    await axios.patch(`${url}/${id}`, data)
    .then(res => {
      toast({
        title : `Update ${type}`,
        status : 'success',
        isClosable : true,
        position : "bottom-right"
      })
    }) 
    .catch(err => {
      toast({
        title : `Update error ${type}`,
        status : 'error',
        isClosable : true,
        position : "bottom-right"
      })
    })
    onClose()
    if (type === 'product') {
      getProducts(url, dispatch)
    }
    else {
      getCategories(url, dispatch)
    }
  }

  function checkType() {
    if (type === 'product') {
      setImage(`${state.products?.find(catItem => catItem.id === itemId)?.image}`)
      setTitle(`${state.products?.find(catItem => catItem.id === itemId)?.title}`)
      setPrice(`${state.products?.find(catItem => catItem.id === itemId)?.price}`)
      setDescription(`${state.products?.find(catItem => catItem.id === itemId)?.description}`)
    } else {
      setImage(`${state.categories?.find(catItem => catItem.id === itemId)?.image}`)
    setTitle(`${state.categories?.find(catItem => catItem.id === itemId)?.title}`)
    }
  }

  useEffect(() => {
    checkType()
  }, [itemId])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update {type}</ModalHeader>
          <ModalCloseButton />
          {type === 'product' ? 
            <ModalBody pb={6}>
            <FormControl>
              <FormLabel m={0}>Image url</FormLabel>
              <Input size={'sm'} rounded={'sm'} value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image url' type='url'/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel m={0}>Name</FormLabel>
              <Input size={'sm'} rounded={'sm'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Name' type='text'/>
            </FormControl>
            <FormControl>
              <FormLabel m={0}>Price</FormLabel>
              <Input size={'sm'} rounded={'sm'} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' type='number'/>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel m={0}>Description</FormLabel>
              <Textarea resize={'none'} padding={'10px'} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' type='text'/>
            </FormControl>
          </ModalBody> :
          <ModalBody pb={6}>
          <FormControl>
            <FormLabel m={0}>Image url</FormLabel>
            <Input size={'sm'} rounded={'sm'} value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image url' type='url'/>
          </FormControl>

          <FormControl mt={3}>
            <FormLabel m={0}>Name</FormLabel>
            <Input size={'sm'} rounded={'sm'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Name' type='text  '/>
          </FormControl>
        </ModalBody>  
        }

          <ModalFooter>
            <Button size={'sm'} rounded={'sm'} onClick={() => UpdateCategory(itemId)} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button size={'sm'} rounded={'sm'} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AlertUpdate
