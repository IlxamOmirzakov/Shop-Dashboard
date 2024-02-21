import { IoIosArrowForward } from "react-icons/io"; 
import { IoIosArrowBack } from "react-icons/io"; 
import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import LayoutContent from './components/LayoutContent'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'
import MainContext from './store/context'
import { initialState, reducer } from './store/reduces'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [showDash, setShowDash] = useState(false)
  return (
    <MainContext.Provider value={{state, dispatch}}>
        <HStack width={'100%'} gap={0}>
        <Box width={'250px'} zIndex={'9999'} position={{base : 'absolute', md : 'relative'}} left={{base : showDash? '0px' : '-250px' , md: '0'}} backgroundColor={useColorModeValue('blue.500', 'gray.800')} height={'100vh'} borderRight={'1px'} borderColor={'whiteAlpha.400'}>
          <Sidebar setShowDash={setShowDash}/>
          <Box position={"absolute"} display={{base : 'block', md : 'none'}} cursor={'pointer'} onClick={() => setShowDash(!showDash)} right={'-20px'} top={'50%'} py={'20px'} pr={'5px'} color={'white'} backgroundColor={useColorModeValue('blue.500', 'gray.800')} roundedRight={'10px'}>
            {showDash ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </Box>
        </Box>
        <Box width={{base : '100%', md: 'calc(100% - 250px)'}}>
          <Header/>
          <Routes>
            <Route path='/' element={<LayoutContent/>}>
              <Route path='/' element={<Categories/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/create-category' element={<CreateCategory/>}/>
              <Route path='/create-product' element={<CreateProduct/>}/>
            </Route>
          </Routes>
        </Box>
      </HStack>
    </MainContext.Provider>
  )
}

export default App
