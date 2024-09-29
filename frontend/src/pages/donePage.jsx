import { Container, VStack ,Text} from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useItemStore } from '../store/items'
import {ItemCard } from '../components/ItemCard'

const DonePage = () => {


    const { fetchItems, items } = useItemStore();
    useEffect(()=>{
      fetchItems();
    },[fetchItems]);

    
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text fontSize={"30"}
              fontWeight={"bold"}
              textAlign={"center"}>
          Completed Notes 📒
         </Text>

        <SimpleGrid column={1}
        spacing={10}
        w={"full"}
        >
          {items.map((item) => (
            ( item.status === "Complete" &&
            <ItemCard key={item._id} item={item} />)
          ))}
        </SimpleGrid>
      </VStack>
      {items.length === 0 && (<Text fontSize={"30"}
              fontWeight={"bold"}
              textAlign={"center"}
        >
          Nothing Found 👀
         </Text>)}
       
    </Container>
  )
}

export default DonePage