import React, { useContext, useEffect, useState } from 'react'
import { getCategories } from '../hooks/getDataAxios'
import MainContext from '../store/context'
import { Box, Card, CardBody, Grid, GridItem, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import CategoryItem from '../components/pagesComponents/CategoryItem'
import AlertDelete from '../components/pagesComponents/AlertDelete'
import AlertUpdate from '../components/pagesComponents/AlertUpdate'

const Categories = () => {
  const {state, dispatch} = useContext(MainContext)
  const url = 'https://online-dashboard-vw07.onrender.com/categories'
  const Arr = [0,1,2,3,4]
  const [itemId, setItemId] = useState()
  const {isOpen:isDeleteOpen, onOpen:onDeleteOpen, onClose:onDeleteClose} = useDisclosure()
  const {isOpen:isUpdateOpen, onOpen:onUpdateOpen, onClose:onUpdateClose} = useDisclosure()

  useEffect(() => {
    getCategories(url, dispatch)
  }, [])
  return ( 
    <>
      { state.isCatLoading && state.categories.lenght === 0 ?
      <Grid gridTemplateColumns={{sm : '1fr', md : '1fr 1fr', lg : '1fr 1fr 1fr', xl : '1fr 1fr 1fr 1fr'}} gap={'10px'}>
        {Arr.map(item => (
          <GridItem key={item}>
            <Card rounded={'sm'} border={'1px'} borderColor={'whiteAlpha.600'}>
              <CardBody display={'flex'} padding={'7px'} justifyContent={'space-between'} alignItems={'center'} gap={'10px'}>
                <Box width={'100%'} display={'flex'} justifyContent={'start'} gap={'5px'}>
                  <Box>
                    <Skeleton height='45px' width={'45px'}/>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
                    <Skeleton height='20px' width={'150px'}/>
                    <Skeleton height='20px' width={'100px'}/>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid> : 
      <Grid gridTemplateColumns={{base : '1fr', sm : '1fr 1fr', md : '1fr 1fr', lg : '1fr 1fr 1fr', xl : '1fr 1fr 1fr 1fr'}} gap={'10px'}>
       <>
       <AlertUpdate isOpen={isUpdateOpen} onOpen={onUpdateOpen} onClose={onUpdateClose} url={url} itemId={itemId} type={'category'}/>
       <AlertDelete isOpen={isDeleteOpen} onClose={onDeleteClose} onOpen={onDeleteOpen} url={url} itemId={itemId} type={'category'}/>
        {state.categories?.map(item => (
            <GridItem key={item.id}>
              <CategoryItem item={item} setItemId={setItemId} onDeleteOpen={onDeleteOpen} onUpdateOpen={onUpdateOpen}/>
            </GridItem>
          ))}
       </>
      </Grid>
      }
    </>
  )
}

export default Categories
