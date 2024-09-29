import {Box, Button, Container, Heading, Input, useColorModeValue, VStack} from '@chakra-ui/react'
import React, { useState } from 'react'
import {useItemStore} from "../store/items"
import {useToast} from '@chakra-ui/react'
import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper} from '@chakra-ui/react'

const CreatePage = () => {
  //State Variable i.e Hook 
  const toast = useToast();
  const [newItem , setNewItem ] = useState({
    name : "",
    severity : 1,
    image : "",
    status : "Incomplete",
    description : ""
  })

  const { createItem } = useItemStore();
  
  const handleItemAdd = async ()=> {
    const {success,message } = await createItem(newItem);
    if(success){
      toast({
        title: 'Entry created.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    else{
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setNewItem({
      name : "",
      severity : 1,
      image : "",
      status : "Incomplete"});
  }

  
  return (
    <Container  maxW={"container.sm"}>
      <VStack spacing={5}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={10}>
          Create New Item
        </Heading>
        <Box 
        margin={20}
          w={"full"} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
            placeholder='Name'
            name='name'
            value={newItem.name}
            onChange={(e)=> setNewItem({...newItem , name: e.target.value})}
            />
            <NumberInput 
              allowMouseWheel
              w={"full"} defaultValue={1} min={1} max={10}
              value={newItem.severity}
              name='severity'
              onChange={(e) => setNewItem({...newItem , severity : e})}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            <Input
            placeholder='Image src'
            name='image'
            value={newItem.image}
            onChange={(e)=> setNewItem({...newItem , image: e.target.value})}
            />
            <Input
            placeholder='Description'
            name='description'
            value={newItem.description}
            onChange={(e)=> setNewItem({...newItem , description: e.target.value})}
            />
            <Button colorScheme='blue' onClick={handleItemAdd} w={"full"}>
              Add Item
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
