import { RouterProvider } from 'react-router-dom';
import './App.css';
import routers from './routers';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
    <>
       <ChakraProvider>
        <RouterProvider router={routers}></RouterProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
