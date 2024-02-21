import React, { useContext, useEffect, useState } from 'react'
import { getCategories, getProducts } from '../hooks/getDataAxios'
import MainContext from '../store/context'
import { Box, Button, Card, CardBody, Grid, GridItem, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import ProductItem from '../components/pagesComponents/ProductItem'
import AlertDelete from '../components/pagesComponents/AlertDelete'
import AlertUpdate from '../components/pagesComponents/AlertUpdate'

const Products = () => {
  const {state, dispatch} = useContext(MainContext)
  const url = 'https://online-dashboard-vw07.onrender.com/products'
  const urlCat = 'https://online-dashboard-vw07.onrender.com/categories'
  const Arr = [0,1,2,3,4]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [itemId, setItemId] = useState()
  const {isOpen:isDeleteOpen, onOpen:onDeleteOpen, onClose:onDeleteClose} = useDisclosure()
  const {isOpen:isUpdateOpen, onOpen:onUpdateOpen, onClose:onUpdateClose} = useDisclosure()

  useEffect(() => {
    getProducts(url, dispatch)
  }, [])

  useEffect(() => {
    getCategories(urlCat, dispatch)
  }, [])

  

  return (
    <>  
      { state.isProLoading && state.products.lenght === 0 ?
      <Box>
        <Grid gridTemplateColumns={{sm : '1fr', md : '1fr 1fr', lg : '1fr 1fr 1fr', xl : '1fr 1fr 1fr 1fr'}} gap={'10px'}>
          {Arr.map(item => (
            <GridItem key={item.id}>
               <Card rounded={'sm'}>
                <CardBody padding={'10px'}>
                  <Stack>
                    <Skeleton height={'200px'}/>
                    <Skeleton height={'20px'}/>
                    <Skeleton height={'20px'}/>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
                      <Skeleton height={'40px'} width={'100%'}/>
                      <Skeleton height={'40px'} width={'100%'}/>
                    </Box>
                  </Stack>
                </CardBody>
               </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>: 
      <>
       <AlertUpdate isOpen={isUpdateOpen} onOpen={onUpdateOpen} onClose={onUpdateClose} url={url} itemId={itemId} type={'product'}/>
       <AlertDelete isOpen={isDeleteOpen} onClose={onDeleteClose} onOpen={onDeleteOpen} url={url} itemId={itemId} type={'product'}/>
          <Grid gridTemplateColumns={{base : '1fr', sm : '1fr 1fr', md : '1fr 1fr', lg : '1fr 1fr 1fr', xl : '1fr 1fr 1fr 1fr'}} gap={'10px'}>
            {state.products?.map(item => (
              <GridItem key={item.id}> 
                  <ProductItem item={item} setItemId={setItemId} onDeleteOpen={onDeleteOpen} onUpdateOpen={onUpdateOpen}/>
              </GridItem>
            ))}
          </Grid>
      </>
      }
    </>
  )
}

export default Products
